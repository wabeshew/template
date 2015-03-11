$(function(){
	$.ajax({
		type : 'GET',
		url : 'https://www.flickr.com/services/rest/',
		data : {
			format : 'json',
			method : 'flickr.photos.search', // 必須 :: 実行メソッド名
			api_key : '2df094fb5c68863fe6d9952dbc88d33a', // 必須 :: API Key
			user_id : '128934768@N02', // 任意 :: userID
			per_page : '100' // 任意 :: 1回あたりの取得件数
		},
		dataType : 'jsonp',
		jsonp : 'jsoncallback', // Flickrの場合はjsoncallback
		success : _getFlickrPhotos // 通信が成功した場合の処理
	});
});

function _getFlickrPhotos(data){
	var dataStat = data.stat;
	var dataTotal = data.photos.total;
	if(dataStat == 'ok'){
		// success ★
		$.each(data.photos.photo, function(i, item){
			// dataを変数へ格納
			var itemOwner = item.owner;
			var itemFarm = item.farm;
			var itemServer = item.server;
			var itemID = item.id;
			var itemSecret = item.secret;
			var itemTitle = item.title;
			var itemLink = 'http://www.flickr.com/photos/' + itemOwner + '/' + itemID + '/'
			// それぞれの要素を結合し、imgパスを生成
			var itemPath = 'http://farm' + itemFarm + '.static.flickr.com/' + itemServer + '/' + itemID + '_' + itemSecret + '.jpg'
			// imgタグ生成
			var flickrSrc = '<img src="' + itemPath + '" alt="' + itemTitle + '" height="200">';
			//DOM生成
			var htmlSrc = '<li><a href="' + itemLink + '" target="_blank">' + flickrSrc + '</a></li>'
			$('#js-photoList').append(htmlSrc);
		});
	}else{
		// fail の場合の処理
	}
}


// メンテ後試す
// $(function(){
// 	$.jsonp({
// 		url : 'https://www.flickr.com/services/rest/',
// 		data : {
// 			format : 'json',
// 			method : 'flickr.photos.search', // 必須 :: 実行メソッド名
// 			api_key : '2df094fb5c68863fe6d9952dbc88d33a', // 必須 :: API Key
// 			user_id : '128934768@N02', // 任意 :: userID
// 			per_page : '100' // 任意 :: 1回あたりの取得件数
// 		},
// 		dataType : 'jsonp',
// 		jsonp : 'jsoncallback', // Flickrの場合はjsoncallback
// 		success: function(json) {
// 			_getFlickrPhotos;
// 		},
// 		error: function() {
// 			$('<div>Flickrはメンテナンス中だよ。Bad,bad!Panda!</div>').replaceAll('#js-photoList');
// 		}
// 	});
// });