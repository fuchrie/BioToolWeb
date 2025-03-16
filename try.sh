git pull
npm config set registry https://registry.npmmirror.com
npm cache clean --force
npm install
npm run build
docker stop biotool
docker rm -r bitool
docker run -d -p 8080:80 -v $PWD/dist:/usr/share/nginx/html -v /home/foryou/mutou/nginx/conf.d:/etc/nginx/conf.d --name biotool nginx