pipeline {
    agent any

    stages {
        stage('Install Dependencies') {
            steps {
                bat 'npm install'
                bat 'npx playwright install --with-deps'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                bat 'npx playwright test --grep @smoke'
            }
        }
    }

    post {
        always {
            echo 'Publishing Playwright HTML report'

            publishHTML([
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report'
            ])
        }

        failure {
            echo 'Build failed – check Playwright HTML report'
        }

        success {
            echo 'Build succeeded – Playwright tests passed'
        }
    }
}
