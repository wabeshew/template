module.exports = (grunt) ->
  #jit-gruntでプラグインを一括で使えるようにする
  require('jit-grunt')(grunt);
  #各タスクの詳細設定
  grunt.initConfig
    # 各種パスの設定
    path:
      'sass': 'develop/scss'
      'css': 'assets/css'
      'js': 'assets/js'
      'styleguide': 'styleguide'
      'img_dev': 'assets/img'
      'img_ass': 'assets/ass-img'
      'sprite': 'assets/img/sprite'
      'assemble': 'src'

    # compassタスク
    compass:
      dev:
        options:
          sassDir: '<%= path.sass %>/test'
          cssDir: '<%= path.css %>'
          noLineComments: true
          debugInfo: false
          environment: 'development'
          force: true
          bundleExec: true
      style:
        options:
          sassDir: '<%= path.sass %>/<%= path.styleguide %>'
          cssDir: '<%= path.css %>'
          noLineComments: true
          debugInfo: true
          environment: 'production'
          force: true
          bundleExec: true
      sprite:
        options:
          sassDir: '<%= path.sass %>/test'
          cssDir: '<%= path.css %>'
          noLineComments: true
          debugInfo: false
          imagesDir: '<%= path.img_dev %>'
          outputStyle: 'expanded'
          environment: 'development'
          force: true
          bundleExec: true

    # ファイル監視タスク（監視対象と実行タスク）
    watch:
      html:
        files: '*.html'
        tasks: ['notify:html']
        options:
          livereload: true,
          spawn: false
      sass:
        files: '<%= path.sass %>/**/*.scss'
        tasks: [
          'compass:dev'
          'notify:sass'
          'csscomb'
        ]
        options:
          livereload: true,
          spawn: false
      style:
        files: '<%= path.sass %>/<%= path.styleguide %>/*.scss'
        tasks: [
          'compass:style'
          'kss'
          'notify:styleguide'
        ]
      assemble:
        files: '<%= path.assemble %>/**/*.hbs'
        tasks: [
          'assemble'
          'notify:assemble'
        ]
        options:
          livereload: true,
          spawn: false

    # ローカルサーバ起動タスク
    connect:
      server:
        options:
          hostname: '*'
          port: 12345
          base: './'

    #お知らせ機能
    notify:
      html:
        options:
          title: 'Task Complete'
          message: 'html changed'
      sass:
        options:
          title: 'Task Complete'
          message: 'sass finished running'
      styleguide:
        options:
          title: 'Task Complete'
          message: 'styleguide finished running'
      sprite:
        options:
          title: 'Task Complete'
          message: 'sprite finished running'
      assemble:
        options:
          title: 'Task Complete'
          message: 'assemble finished running'

    #KSSスタイルガイド生成
    kss:
      options:
        includeType: 'css'
        includePath: '<%= path.css %>/styleguide.css'
        template: 'styleguide/template'
      dist:
        files:
          'styleguide': ['<%= path.sass %>/<%= path.styleguide %>']

    #assemble生成
    assemble:
      site:
        options:
          data: ['config.yml']
          layout: 'src/layouts/default.hbs'
          partials: 'src/partials/**/*.hbs'
          flatten: true
        files: [{
          src: 'src/pages/test.hbs', dest: 'test.html'
        }]

    # htmlhintタスク
    htmlhint:
      options:
        htmlhintrc: '.htmlhintrc'
        force: true
      dev:
        src: ['/']

    # csslintタスク
    csslint:
      options:
        csslintrc: '.csslintrc'
        force: true
      dev:
        src: ['<%= path.css %>/**/*.css']

    # 指定ディレクトリを削除
    clean:
      sprite: ['<%= path.img_dev %>/*-*.png']

    # 画像の最適化
    imagemin:
      dynamic:
        files: [{
          expand: true
          cwd: '<%= path.img_dev %>'
          #カレントディレクトリの設定
          src: ['*.png']
          dest: '<%= path.img_dev %>'
        }]

    #CSS最適化
    csscomb:
      options:
        config: 'csscomb.json'
      dynamic_mappings:
        expand: true
        cwd: 'assets/css/'
        src: ['*.css']
        dest: 'assets/css/'
        force: true

  # grunt実行時に実行するタスク
  grunt.registerTask 'dev', ['connect', 'watch']
  grunt.registerTask 'styleguide', ['compass:style', 'kss', 'connect', 'watch']
  grunt.registerTask 'sprite', ['compass:sprite', 'clean:sprite', 'newer:imagemin:dynamic', 'notify:sprite', 'connect', 'watch']
  grunt.registerTask 'ass', ['assemble', 'connect', 'watch']
  grunt.registerTask 'html', ['htmlhint:dev']
  grunt.registerTask 'css', ['csslint:dev']
  grunt.registerTask 'img', ['newer:imagemin:dynamic']

  return
