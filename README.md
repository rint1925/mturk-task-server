# mturk-task-server

![回答画面](https://i.imgur.com/5xgY4T0.gif)


## 概要

クラウドソーシングプラットフォーム Amazon Mechanical Turk (AMT) を通じてタスクを依頼した際にワーカーが実際に回答を行うWebページです。

AMTでは、ワーカーが回答を行うWebページを自作することができる。更に、自前でWebサーバーを用意することもでき、自前サーバーが提供するページを表示させることもできる。この仕様を上手く活用することで、ワーカーの回答時間を測定する等、自由なタスク設計が可能となる。詳しくは以下のDeveloper Guideを参照。

> <https://docs.aws.amazon.com/AWSMechTurk/latest/AWSMechanicalTurkRequester/WhatIs.html>

Webサーバーを立て、このリポジトリをドキュメントルートにCloneして動かします。
ここではAmazonEC2を利用したLAMP環境の構築を想定しています。

※試作中のシステムです

## 構成

- Amazon EC2 (Amazon Linux 2)
- Apache
- PHP
- ※MariaDB (現段階では未使用)


## サーバ構築手順


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

httpd.confは読み取り専用ファイルになっているので、sudoでvimエディタを起動する点に注意

```sh
# /etc/httpd/conf/httpd.conf

- DocumentRoot "/var/www/html"
+ DocumentRoot "/var/www/html/mturk-task-server"
```

この後、Apacheを再起動する。

```sh
sudo systemctl restart httpd
```

再起動が完了し、ブラウザからサーバーのアドレスにアクセスするとタスク回答画面が表示される.

回答を行うとAMTのサーバーにPOSTが送られ、回答が完了したことを伝えることになる。