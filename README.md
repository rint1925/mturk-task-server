# mturk-task-server

Amazon Mechanical Turk (AMT) のタスクページです。

Webサーバーを立て、このリポジトリをドキュメントルートにCloneして動かします。

## 構成
---
- Amazon EC2 (Amazon Linux 2)
- Apache
- PHP
- MariaDB (現段階では未使用)


## サーバ構築手順
---

### 1. Amazon EC2インスタンスを作成する

Elastic IP(静的IPアドレス) を取得し、常に同じアドレスでアクセスできるようにしておく。


### 2. LAMPサーバを構築する

> <https://docs.aws.amazon.com/ja_jp/AWSEC2/latest/UserGuide/ec2-lamp-amazon-linux-2.html>

上のリンクを参考にしながらやれば手間は掛からない。


### 3. HTTPSを利用する

AMTでのタスクページはHTTPSで接続できる必要がある。

> <https://docs.aws.amazon.com/ja_jp/AWSEC2/latest/UserGuide/SSL-on-amazon-linux-2.html>

上のリンクを参考に、Step1まで進める. https:// というプレフィックスに変えて、(警告が出ても)アクセスできるか確認する。

HTTPSでアクセス出来ればいいので、ここでは署名証明書の取得は行わない。

### 4. gitをインストールする

```sh
sudo yum install -y git
```

### 5. リポジトリをクローンする

```sh
sudo chmod -R 777 /var/www/html/

cd /var/www/html/

git clone https://github.com/rint1925/mturk-task-server
```

### 6. ルートディレクトリを変更する

```sh
# /etc/httpd/conf/httpd.conf

- DocumentRoot "/var/www/html"
+ DocumentRoot "/var/www/html/dist"
```

この後、Apacheを再起動する。

```sh
sudo systemctl restart httpd
```