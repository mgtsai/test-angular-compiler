FROM debian:jessie

# Install OpenJDK 8
RUN echo "deb http://deb.debian.org/debian/ jessie-backports main" > /etc/apt/sources.list.d/jessie-backports.list && \
    apt-get update && \
    apt-get install -y -q -t jessie-backports openjdk-8-jdk

# Install Docker
RUN apt-get update && \
    apt-get install -y -q apt-transport-https ca-certificates curl software-properties-common && \
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add - && \
    (test "$(apt-key fingerprint 0EBFCD88 | grep 'E2D8 8D81 803C 0EBF CD88')" != "" || (echo Fingerprint unmatched && false)) && \
    add-apt-repository "deb https://download.docker.com/linux/debian jessie stable" && \
    apt-get update && \
    apt-get install -y -q docker-ce=17.12.0~ce-0~debian

# Install NodeJS
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash - && \
    apt-get install -y -q nodejs=6.12.3-1nodesource1

# Clean up temp files
#RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/*
