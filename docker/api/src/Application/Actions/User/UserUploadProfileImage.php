<?php

declare(strict_types=1);

namespace App\Application\Actions\User;

use App\Application\Actions\Action;
use App\Domain\User\DuplicateEmailException;
use App\Domain\User\InvalidImageUploaded;
use App\Domain\User\User;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Exception\ORMException;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\TransactionRequiredException;
use Exception;
use PharIo\Manifest\InvalidEmailException;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\UploadedFileInterface;
use Slim\Factory\AppFactory;
use Slim\Logger;
use Slim\Psr7\Response;
use TypeError;

class UserUploadProfileImage extends Action
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

        try {
            $userId = $this->resolveArg('user_id');
            $uploadedFiles = $this->request->getUploadedFiles();
            $directory = '/var/www/html/api/public/profileimages';
          // if (empty($uploadFiles)) {
          //      throw new InvalidImageUploaded();
          //  }


           // https://www.slimframework.com/docs/v4/cookbook/uploading-files.html
            $profileImage = $uploadedFiles['profile-image'];
            if ($profileImage->getError() !== UPLOAD_ERR_OK) {
                $this->logger->error(print_r($profileImage, true));
                throw new Exception('Something went wrong while uploading the image.');
            }

            $filename = $this->moveUploadedFile($directory, $profileImage);


            $this->response->withHeader('Access-Control-Allow-Origin', '*');

            return $this->respondWithData(['message' => 'User ID', 'filename' => $_ENV['REACT_APP_API_BASE'] . '/profileimages/'.$filename], 200);
        } catch (InvalidImageUploaded | Exception $e) {
            return $this->respondWithData(['message' => $e->getMessage()], 500);

        }
    }

    /**
     * https://www.slimframework.com/docs/v4/cookbook/uploading-files.html
     * Moves the uploaded file to the upload directory and assigns it a unique name
     * to avoid overwriting an existing uploaded file.
     *
     * @param string $directory The directory to which the file is moved
     * @param UploadedFileInterface $uploadedFile The file uploaded file to move
     *
     * @return string The filename of moved file
     * @throws Exception
     */
    function moveUploadedFile(string $directory, UploadedFileInterface $uploadedFile): string
    {
        $extension = pathinfo($uploadedFile->getClientFilename(), PATHINFO_EXTENSION);

        $userId = $_COOKIE['freshMartUserId'];
        $basename = md5($userId.'-freshMart-user-profile-image');
        $filename = sprintf('%s.%0.8s', $basename, 'jpg');
        $uploadedFile->moveTo($directory . DIRECTORY_SEPARATOR . $filename);

        return $filename;
    }
}
