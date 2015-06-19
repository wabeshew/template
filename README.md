template
========
作業効率化のための自分用テンプレート。<br>
随時アップデートしております。

##Usage
###1. Install local ruby
以下を実行して、任意バージョンのrubyをローカルにインストールします。<br>
`$ rbenv local <rubyのバージョン>`

###2. Install Sass & Compass
以下を実行して、*Sass*と*Compass*をローカルにインストールします。<br>
`$ bundle install`

###3. npm install
以下を実行して、`package.json`の内容をインストール。<br>
`$ npm install`

##Grunt command
$ grunt dev   開発用<br>
$ grunt style   スタイルガイド生成用<br>
$ grunt sprite  スプライト画像生成用<br>
$ grunt ass     アセンブル（テンプレート）構築用<br>
$ grunt html    HTMLリント<br>
$ grunt css     CSSリントぉ

##調査なう
`rbenv local <バージョン>`でインストールするとパスがおかしくなる<br>
→なぜか、userからになっちゃう。<br>
→フォルダ名が原因でした。