<?php

declare(strict_types=1);

namespace App\Application\Actions\User;

use App\Application\Actions\Action;
use App\Domain\User\EmailNotFoundException;
use App\Domain\User\InvalidPasswordException;
use App\Domain\User\User;
use Doctrine\ORM\EntityManager;
use Mailgun\Mailgun;
use PharIo\Manifest\InvalidEmailException;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;
use Psr\Http\Client\ClientExceptionInterface;
use Psr\Http\Message\ResponseInterface;
use Slim\Factory\AppFactory;
use Slim\Logger;
use Slim\Psr7\Response;

class UserForgotPasswordAction extends Action
{

    private EntityManager $em;

    /**
     * @throws ContainerExceptionInterface
     * @throws NotFoundExceptionInterface
     */
    public function __construct(EntityManager $em)
    {
        $this->em = $em;
        $app = AppFactory::create();
        $c = $app->getContainer();
        $logger = $c->get(Logger::class);
        parent::__construct($logger);
    }

    /**
     * {@inheritdoc}
     */
    protected function action(): ResponseInterface
    {

        $this->response->withHeader('Access-Control-Allow-Origin', '*');

        try {
            $payload = $this->request->getParsedBody();
            $email = $payload['email'] ?? null;
            $userRepository = $this->em->getRepository(User::class);

            //Make sure the email matches a valid email address
            if(!preg_match('/(^\w.*?@\w.*?\.\w*$)/', $email)){
                throw new InvalidEmailException();
            }

            /** @var User $user */
            $user = $userRepository->findOneBy(['username' => $email]);

            if($user){

                $apiKey = getenv('MAILGUN_API_KEY') ?? '';
                $mg = Mailgun::create($apiKey);
                //Send email
                $firstName = $user->getFirstName();
                $subject = 'Fresh Market Password Reset';
                //$headers = 'From: admin@fresh-market-store.com' . "\r\n";
                $message = <<<EMAIL
                    Hello $firstName,
                    A request was made to reset the password to the account identified by this email address
                    on the Fresh Market portal.
                    
                    If this was not you, please let us know.
                    
                    Use password reset link below to reset your password.
                    {$_SERVER['HTTP_HOST']}/users/reset-password?secretToken=AnInsecureResetToken!">
                EMAIL;

                $mg->messages()->send('sandboxa638b0f6a35b458fad9c6f9efb569385.mailgun.org', [
                    'from' => 'test@sandboxa638b0f6a35b458fad9c6f9efb569385.mailgun.org',
                    'to' => $email,
                    'subject' => $subject,
                    'text' => $message
                ]);
            }

            return $this->respondWithData(['message' => 'If that account exists, and email has been sent to it.'], 200);
        }catch(InvalidEmailException $e){
            $this->logger->error($e->getMessage());
            return $this->respondWithData(['message' => $e->getMessage()], 500);
        } catch (ClientExceptionInterface $e) {
            $this->logger->error($e->getMessage());
            return $this->respondWithData(['message' => $e->getMessage()], 500);
        }
    }
}
