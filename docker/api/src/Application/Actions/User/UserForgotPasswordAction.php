<?php

declare(strict_types=1);

namespace App\Application\Actions\User;

use App\Application\Actions\Action;
use App\Domain\User\User;
use Doctrine\ORM\EntityManager;
use Exception;
use PharIo\Manifest\InvalidEmailException;
use PHPMailer\PHPMailer\Exception as MailException;
use PHPMailer\PHPMailer\PHPMailer;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;
use Psr\Http\Message\ResponseInterface;
use Slim\Factory\AppFactory;
use Slim\Logger;
use Symfony\Contracts\HttpClient\Exception\ClientExceptionInterface;

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

                $host = $_ENV['REACT_APP_FRONTEND_BASE'] ?? '';
                $mail = new PHPMailer();
                $mail->isSMTP();
                $mail->Host = $_ENV['SMTP_HOST'];
                $mail->Username = $_ENV['SMTP_USERNAME'];
                $mail->Password = $_ENV['SMTP_PASSWORD'];
                $mail->SMTPAuth   = TRUE;
                $mail->SMTPSecure = "tls";
                $mail->Port       = 587;

                //Send email
                $firstName = $user->getFirstName();
                $subject = 'Fresh Market Password Reset';
                $reset_token = md5(date('Y-m-d H:i:s').$firstName);
                $user->setPasswordResetToken($reset_token);
                $this->em->persist($user);
                $this->em->flush();

                $message = <<<EMAIL
                    Hello $firstName,
                    A request was made to reset the password to the account identified by this email address
                    on the Fresh Market portal.
                    
                    If this was not you, please let us know.
                    
                    Use password reset link below to reset your password.<br/>
                    <a href="$host/ResetPassword/$reset_token/$email">Reset Password</a>
                EMAIL;

                $mail->addAddress($email, $firstName);
                $mail->Subject = $subject;
                $mail->msgHTML($message);

                if(!$mail->send()){
                    throw new MailException('Error sending message');
                }
            }

            return $this->respondWithData(['message' => 'If that account exists, an email has been sent to the registered email address.'], 200);
        }catch(InvalidEmailException $e){
            $this->logger->error($e->getMessage());
            return $this->respondWithData(['message' => 'The email entered is not valid.'], 500);
        } catch (ClientExceptionInterface $e) {
            $this->logger->error($e->getMessage());
            return $this->respondWithData(['message' => $e->getMessage()], 500);
        } catch (Exception $e) {
            return $this->respondWithData(['message' => $e->getMessage()], 500);
        }
    }
}
