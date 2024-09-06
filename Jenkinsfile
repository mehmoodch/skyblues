pipeline {
    agent any

    environment {
        AWS_ACCESS_KEY_ID = credentials('aws-access-key-id')    // Use credentials ID from Jenkins
        AWS_SECRET_ACCESS_KEY = credentials('aws-secret-access-key') // Use credentials ID from Jenkins
        S3_BUCKET = 'your-s3-bucket-name'  // Replace with your actual S3 bucket name
        AWS_REGION = 'us-east-1'           // Replace with your AWS region
    }

    stages {
        stage('Clone Repository') {
            steps {
                // Clone the GitHub repository
                git 'https://github.com/yourusername/your-repo.git'
            }
        }

        stage('Install AWS CLI') {
            steps {
                // Install AWS CLI (in case it's not installed)
                sh 'apt-get update && apt-get install -y awscli'
            }
        }

        stage('Deploy to S3') {
            steps {
                // Sync files from the repository to the S3 bucket
                sh '''
                aws s3 sync . s3://$S3_BUCKET/ --region $AWS_REGION --delete
                '''
            }
        }
    }

    post {
        success {
            echo 'Deployment to S3 successful!'
        }
        failure {
            echo 'Deployment to S3 failed.'
        }
    }
}
