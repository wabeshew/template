$(function(){
	$.ajax({
		type : 'GET',
		url : 'https://www.flickr.com/services/rest/',
		data : {
			format : 'json',
			method : 'flickr.photos.search', // 必須 :: 実行メソッド名
			api_key : '2df094fb5c68863fe6d9952dbc88d33a', // 必須 :: API Key
			user_id : '128934768@N02', // 任意 :: userID
		},
		dataType : 'jsonp',
		jsonp : 'jsoncallback', // Flickrの場合はjsoncallback
		success : _getFlickrPhotos // 通信が成功した場合の処理
	});
});

function _getFlickrPhotos(data){
	var PHOTO_TOTALNUM = 4;
	if(PHOTO_TOTALNUM > data.photos.total) {
		PHOTO_TOTALNUM = data.photos.total - 1;
	}
	var dataStat = data.stat;
	var dataTotal = data.photos.total;
	var random = 0;
	if(dataStat == 'ok'){
		// success ★
		var random = _randomNum(dataTotal);
		for (var i = PHOTO_TOTALNUM; i >= 0; i--) {
			var item = data.photos.photo[random[i]];
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
		};
	} else {
		// fail の場合の処理
	}
}

function _randomNum(dataTotal) {
	//生成した乱数を格納する配列を初期化
	var generated = new Array();
	//生成した乱数を格納している配列の長さ（生成した乱数の数）
	var generatedCount = generated.length;
	//パラメータ count の数だけ Math.random()で乱数を発生
	for(var i = 0 ; i < dataTotal; i++){
		var candidate = Math.floor(Math.random() * dataTotal);
		//今まで生成された乱数と同じ場合は再度乱数を発生
		for(var j = 0; j < generatedCount; j++) {
			if(candidate == generated[j]){
				candidate = Math.floor(Math.random() * dataTotal);
				j = -1;
			}
		}
		generated[i] = candidate
		generatedCount++;
	}
	return generated;
}
