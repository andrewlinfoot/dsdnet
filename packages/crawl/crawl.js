Crawl = {};

Crawl.categories = function () {
  var options = {headers: {}};
  var cookieUrl = 
    'http://12.192.21.195/netlinkcatalog/asp/cucbook.asp?bunit=1&cuswhs=001';
  var categoriesUrl = 
    'http://12.192.21.195/netlinkcatalog/asp/contentspane.asp?mode=NC';
  var categoryUrlTemp = 
    'http://12.192.21.195/netlinkcatalog/asp/contentspane.asp?itcat={0}&open=1#{0}'
  HTTP.get(cookieUrl, function(error, result){
    options.headers.Cookie = result.headers['set-cookie'][0];
    HTTP.get(categoriesUrl, 
      options,
      function (error, result) {
        var $doc = $(result.content);
        var $menu = $doc.find('.clsMainMenu a :nth-child(3)');
        if($menu.length == 0){
          console.log('no result, check cookie');
          return
        }
        var categories = $menu.map(function(index, element){
          var h = element.href;
          var index = h.indexOf('itcat=');
          var val = h.substring(index +6, index+10);
          return {
            title : element.title.split(':')[1].substring(1),
            url : categoryUrlTemp.replace(/{(0)}/g, val)
          };
        });
        for(var j = 0; j < categories.length; j++){
          HTTP.get(categories[j]['url'], options, function(error, result){
            var $doc = $(result.content);
            var $submenu = $doc.find('.clsMainMenu');
            if($submenu.length == 0){
              console.log(
                'no result for {0}, check cookie'.replace(/{(0)}/g,
                  this.category.name)
                );
            }
            var catId = Categories.insert({
                name : this.category.title,
                parent : null
              });
            for( var i = 0; i < $submenu.length; i++){
              var children = $submenu.eq(i).children();
              if(children.length != 3){
                continue;
              }
              var child = children.eq(2)
              Categories.insert({
                name : child.attr('title').split(':')[1].substring(5),
                url : child.attr('href'),
                parent : catId
              })
            }
          }.bind({category : categories[j]}));
        }
      });
  });
};
