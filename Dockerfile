FROM amd64/openjdk:18
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar

ENV SPRING_PROFILES_ACTIVE=prod
ENV TIMEZONE 'America/Asuncion'
ENV REDIS_HOST 'localhost'
ENV DB_HOST 'localhost'
ENV DB_PORT '5432'
ENV DB_NAME 'itflow'
ENV DB_USE_SSL 'false'
ENV DB_USER 'postgres'
ENV DB_PWD 'postgres'
ENV MAIL_USER 'mailtrap_user'
ENV MAIL_PWD 'mailtrap_pwd'
ENV MAIL_SERVER 'mailtrap.io'
ENV MAIL_PORT 587
ENV MAIL_AUTH 'true'
ENV ENABLE_TLS 'true'
ENV ENABLE_SSL 'false'
ENV MAIL_SSL_PROTOCOLS ''
ENV JWT_SECRET ${echo openssl rand -base64 64}
ENV JWT_EXPIRE 720

ENTRYPOINT ["java","-jar","/app.jar"]