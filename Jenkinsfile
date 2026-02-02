pipeline {
    agent any

    environment {
        IMAGE_NAME = "karlozk/healthcare-portal"
        IMAGE_TAG  = "latest"
        CONTAINER  = "healthcare-container"
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME:$IMAGE_TAG .'
            }
        }

        stage('Push Image to Docker Hub') {
            steps {
                sh 'docker push $IMAGE_NAME:$IMAGE_TAG'
            }
        }

        stage('Deploy Container') {
            steps {
                sh '''
                docker rm -f $CONTAINER || true
                docker pull $IMAGE_NAME:$IMAGE_TAG
                docker run -d -p 80:80 --name $CONTAINER $IMAGE_NAME:$IMAGE_TAG
                '''
            }
        }
    }
}
