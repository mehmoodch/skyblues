pipeline {
    agent any

    environment {
        AWS_ACCESS_KEY_ID = credentials('AWS_ACCESS_KEY_ID')  // Store this in Jenkins Credentials
        AWS_SECRET_ACCESS_KEY = credentials('AWS_SECRET_ACCESS_KEY')  // Store this in Jenkins Credentials
        S3_BUCKET_NAME = 'skyblues'
        AWS_REGION = 'eu-north-1' // Specify your AWS region
    }

    stages {
        stage('Checkout Code') {
            steps {
                // Checkout the latest code from GitHub
                git branch: 'main', url: 'https://github.com/mehmoodch/skyblues.git'
            }
        }

        stage('Install AWS CLI') {
            steps {
                // Install AWS CLI if not already installed
                sh 'curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"'
                sh 'unzip awscliv2.zip'
                sh './aws/install'
            }
        }

        stage('Deploy to S3') {
            steps {
                // Deploy the code to S3
                sh '''
                aws s3 sync . s3://$S3_BUCKET_NAME --region $AWS_REGION --delete
                '''
            }
        }
    }

    post {
        success {
            echo 'Code deployed successfully to S3!'
        }
        failure {
            echo 'Deployment failed!'
        }
    }
}
