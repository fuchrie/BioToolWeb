git pull
npm config set registry https://registry.npmmirror.com
npm cache clean --force
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # 加载 nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # 加载 nvm 的 bash 补全功能
nvm install 20.11.1
nvm use 20.11.1
npm install
npm run build
docker stop biotool
docker rm -f biotool
docker run -d -p 8080:80 -v $PWD/dist:/usr/share/nginx/html -v /home/foryou/mutou/nginx/conf.d:/etc/nginx/conf.d --name biotool nginx