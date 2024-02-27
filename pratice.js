function public_infrastructure_park() {
    // 發起第一個 AJAX 請求，獲取公園資料
   $.ajax({
       type: 'GET',
       url: 'https://soa.tainan.gov.tw/Api/Service/Get/7ed7d9a6-92f8-4897-947f-e18b19345f9e',
       dataType: 'json',
       contentType: 'application/json;charset=utf-8',
       success: function (jsondata1) {
           console.log(jsondata1.data);
           // 從公園資料中擷取所需的屬性，建立新的 parkdata 陣列
           var parkdata = jsondata1.data.map(function (item) {
               return {
                   X: item.X座標,
                   Y: item.Y座標,
                   District: item.所在轄區,
                   Address: item.座落位置,
                   Landmarkname: item.公園名稱,
                   Small_category: item.類別
               };
           });

           // 發起第二個 AJAX 請求，獲取特色公園資料
           $.ajax({
               type: 'GET',
               url: 'https://soa.tainan.gov.tw/Api/Service/Get/91b1d113-4b5d-498d-bebd-4c6df2d218bd',
               dataType: 'json',
               contentType: 'application/json;charset=utf-8',
               success: function (jsondata2) {
                   console.log(jsondata2)
                   // 從特色公園資料中擷取所需的屬性，建立新的 featureparkdata 陣列
                   var featureparkdata = jsondata2.data.map(item => {
                       return {
                           X: item.經度,
                           Y: item.緯度,
                           District: item.行政區,
                           Address: item.座落位置,
                           Landmarkname: item.公園名稱,
                           Small_category: '特色公園'
                       }
                   });
                   // 將兩個資料陣列合併成一個 mergeparkdata 陣列
                   var mergeparkdata = parkdata.concat(featureparkdata);
                   // 逐一處理 mergeparkdata 陣列中的每個資料項目
                   $.each(mergeparkdata, function (index, value) {
                       console.log(value)
                        // 使用定時器以每 50 毫秒的間隔處理資料項目
                       setTimeout(function () {
                           // 發起 POST 請求，將處理後的資料項目匯入 API
                           $.ajax({
                               type: 'POST',
                               url: './api/public_infrastructure',
                               dataType: 'json',
                               data: JSON.stringify({
                                   Large_category: '公共設施',
                                   Medium_category: '公園',
                                   Small_category: value.Small_category,
                                   Landmarkname: value.Landmarkname,
                                   District: value.District,
                                   Address: value.Address,
                                   Tel: '',
                                   X: value.X,
                                   Y: value.Y
                               }),
                               contentType: 'application/json;charset=utf-8',
                               success: function () {
                                   console.log('成功匯入')
                               }, error: function (xhr, status, error) {
                                   console.log("無法讀取資料" + error)
                               }
                           })
                       }, index*50)
                   })
               }, error: function (xhr, status, error) {
                   console.log("無法讀取資料" + error)
               }
           })
       }, error: function (xhr, status, error) {
           console.log("無法讀取資料" + error)
       }
   })
}


// 在文件載入完成後執行
$(document).ready(function () {
   // 綁定按鈕點擊事件，觸發 public_infrastructure_park 函式
   $('#public_infrastructure_park').click(function () {
       public_infrastructure_park();
   });
});


function public_infrastructure_library() {
   $.ajax({
       type: 'GET',
       url: 'https://data.tainan.gov.tw/api/3/action/datastore_search?resource_id=0c02d152-7091-4316-9880-43f13a9243ac',
       dataType: 'json',
       contentType: 'application/json;charset=utf-8',
       success: function (jsondata) {
           var data = jsondata.result.records;
           $.each(data, function (index, value) {
               //將TWD97座標轉成經緯度，套入公式
               var $x = value.X坐標;
               var $y = value.Y坐標;
               var result = twd97_to_latlng($x, $y);
               var District = value.地址.split(/[縣市]/)[1].split(/[區]/)[0] + '區'
               // 使用定時器以每 50 毫秒的間隔處理資料項目
               setTimeout(function () {
                   // 發起 POST 請求，將處理後的資料項目匯入 API
                   $.ajax({
                       type: 'POST',
                       url: './api/public_infrastructure',
                       dataType: 'json',
                       data: JSON.stringify({
                           Large_category: '公共設施',
                           Medium_category: '圖書館',
                           Small_category: '圖書館',
                           Landmarkname: value.館別,
                           District: District,
                           Address: value.地址,
                           Tel: '',
                           X: result.X,
                           Y: result.Y
                       }),
                       contentType: 'application/json;charset=utf-8',
                       success: function () {
                           console.log('成功匯入')
                       }, error: function (xhr, status, error) {
                           console.log("無法讀取資料" + error)
                       }
                   })
               }, index * 50)
           })
       }, error: function (xhr, status, error) {
           console.log("資料提取失敗"+error)
       }
   })
}


// 在文件載入完成後執行
$(document).ready(function () {
   // 綁定按鈕點擊事件，觸發 public_infrastructure_library 函式
   $('#public_infrastructure_library').click(function () {
       public_infrastructure_library();
   });
});




function public_infrastructure_publicmarket() {
   $.ajax({
       type: 'GET',
       url: 'https://data.tainan.gov.tw/api/3/action/datastore_search?resource_id=51e14c7f-8292-4816-98c2-23be1c2a0abf',
       dataType: 'json',
       contentType: 'application/json;charset=utf-8',
       success: function (jsondata) {
           var data = jsondata.result.records;
           $.each(data, function (index, value) {
               var address = value.地址;
               console.log(address);
               setTimeout(function () {
                   $.ajax({
                       type: 'GET',
                       url: wsUrl,
                       data: {
                           oAPPId: AppID, //應用程式識別碼(APPId)
                           oAPIKey: APIKey, // 應用程式介接驗證碼(APIKey)
                           oAddress: address, //所要查詢的門牌位置
                           oSRS: 'EPSG:4326', //回傳的坐標系統
                           oFuzzyType: "0", //模糊比對的代碼
                           oResultDataType: 'JSON', //回傳的資料格式
                           oFuzzyBuffer: "0", //模糊比對回傳門牌號的許可誤差範圍
                           oIsOnlyFullMatch: "false", //是否只進行完全比對
                           oIsSupportPast: "true", //是否顯示舊門牌
                           oIsShowCodeBase: "true", //是否顯示統計區資訊
                           oIsLockCounty: "false", //是否鎖定縣市
                           oIsLockTown: "false", //是否鎖定鄉鎮市區
                           oIsLockVillage: "false", //是否鎖定村里
                           oIsLockRoadSection: "false", //是否鎖定路段
                           oIsLockLane: "false", //是否鎖定巷
                           oIsLockAlley: "false", //是否鎖定弄
                           oIsLockArea: "false", //是否鎖定地區
                           oIsSameNumber_SubNumber: "false", //號之、之號是否視為相同
                           oCanIgnoreVillage: "false", //找不時是否可忽略村里
                           oCanIgnoreNeighborhood: "false", //找不時是否可忽略鄰
                           oReturnMaxCount: "0"//如為多筆時，限制回傳最大筆數
                       }, dataType:'xml'
                       , success: function (geodata) {
                           console.log(geodata)
                           var data = $(geodata).find('string').text();
                           var geoJSON = JSON.parse(data);
                           if (geodata && geoJSON.AddressList.length > 0) {
                               var X = geoJSON.AddressList[0].X;
                               var Y = geoJSON.AddressList[0].Y;
                               $.ajax({
                                   type: 'POST',
                                   url: './api/public_infrastructure',
                                   dataType: 'json',
                                   data: JSON.stringify({
                                       Large_category: '公共設施',
                                       Medium_category: '市場',
                                       Small_category: '公有零售市場',
                                       Landmarkname: value.市集名稱,
                                       District: value.區別,
                                       Address: value.地址,
                                       Tel: '',
                                       X: X,
                                       Y: Y
                                   }),
                                   contentType: 'application/json;charset=utf-8',
                                   success: function () {
                                       console.log('成功匯入')
                                   }, error: function (xhr, status, error) {
                                       console.log("無法讀取資料" + error)
                                   }
                               })
                           } else {
                               console.log("無法解析地址")
                           }
                       }, error: function (xhr, status, error) {
                           console.log("資料匯入失敗"+ error)
                       }
                   })
               },index*50)
           })
       }, error: function (xhr, status, error) {
           console.log("資料匯入失敗")
       }
   })
}

// 在文件載入完成後執行
$(document).ready(function () {
   // 綁定按鈕點擊事件，觸發 public_infrastructure_publicmarket 函式
   $('#public_infrastructure_publicmarket').click(function () {
       public_infrastructure_publicmarket();
   });
});




// 定義一個函式，用於從開放資料平台獲取民有市場資料並匯入資料庫
function public_infrastructure_privatemarket() {
   $.ajax({
       type: 'GET',
       url: 'https://data.tainan.gov.tw/api/3/action/datastore_search?resource_id=188b191c-c9bf-438a-9bda-a5fbc3ce6a53',
       dataType: 'json',
       contentType: 'application/json;charset=utf-8',
       success: function (jsondata) {
           var data = jsondata.result.records;
            // 使用 $.each() 方法遍歷每個資料項
           $.each(data, function (index, value) {
                // 建立完整的地址字串
               var address = '台南市' + value.行政區 + value.地點;
               console.log(address);
               setTimeout(function () {
                   $.ajax({
                       type: 'GET',
                       url: wsUrl,
                       data: {
                           oAPPId: AppID, //應用程式識別碼(APPId)
                           oAPIKey: APIKey, // 應用程式介接驗證碼(APIKey)
                           oAddress: address, //所要查詢的門牌位置
                           oSRS: 'EPSG:4326', //回傳的坐標系統
                           oFuzzyType: "0", //模糊比對的代碼
                           oResultDataType: 'JSON', //回傳的資料格式
                           oFuzzyBuffer: "0", //模糊比對回傳門牌號的許可誤差範圍
                           oIsOnlyFullMatch: "false", //是否只進行完全比對
                           oIsSupportPast: "true", //是否顯示舊門牌
                           oIsShowCodeBase: "true", //是否顯示統計區資訊
                           oIsLockCounty: "false", //是否鎖定縣市
                           oIsLockTown: "false", //是否鎖定鄉鎮市區
                           oIsLockVillage: "false", //是否鎖定村里
                           oIsLockRoadSection: "false", //是否鎖定路段
                           oIsLockLane: "false", //是否鎖定巷
                           oIsLockAlley: "false", //是否鎖定弄
                           oIsLockArea: "false", //是否鎖定地區
                           oIsSameNumber_SubNumber: "false", //號之、之號是否視為相同
                           oCanIgnoreVillage: "false", //找不時是否可忽略村里
                           oCanIgnoreNeighborhood: "false", //找不時是否可忽略鄰
                           oReturnMaxCount: "0"//如為多筆時，限制回傳最大筆數
                       }, dataType: 'xml'
                       , success: function (geodata) {
                           console.log(geodata)
                           var data = $(geodata).find('string').text();
                           var geoJSON = JSON.parse(data);
                           // 檢查解析後的資料是否存在
                           if (geodata && geoJSON.AddressList.length > 0) {
                               // 提取經緯度資訊
                               var X = geoJSON.AddressList[0].X;
                               var Y = geoJSON.AddressList[0].Y;
                               $.ajax({
                                   type: 'POST',
                                   url: './api/public_infrastructure',
                                   dataType: 'json',
                                   data: JSON.stringify({
                                       Large_category: '公共設施',
                                       Medium_category: '市場',
                                       Small_category: '民有市場',
                                       Landmarkname: value.市場名稱,
                                       District: value.行政區,
                                       Address: address,
                                       Tel: '',
                                       X: X,
                                       Y: Y
                                   }),
                                   contentType: 'application/json;charset=utf-8',
                                   success: function () {
                                       console.log('成功匯入')
                                   }, error: function (xhr, status, error) {
                                       console.log("無法讀取資料" + error)
                                   }
                               })
                           } else {
                               console.log("無法解析地址")
                           }
                       }, error: function (xhr, status, error) {
                           console.log("資料匯入失敗" + error)
                       }
                   })
               }, index * 50)// 設定延遲時間，以便順序執行
           })
       }, error: function (xhr, status, error) {
           console.log("資料匯入失敗")
       }
   })
}

// 在文件載入完成後執行
$(document).ready(function () {
   // 綁定按鈕點擊事件，觸發 public_infrastructure_privatemarket 函式
   $('#public_infrastructure_privatemarket').click(function () {
       public_infrastructure_privatemarket();
   });
});




// 定義一個函式，用於從 API 獲取政府體育場館資料並匯入資料庫
function public_infrastructure_governmentstadium() {
   $.ajax({
       type: 'GET',
       url: 'https://soa.tainan.gov.tw/Api/Service/Get/21308ec5-2a90-4526-b053-19617be7bca5',
       dataType: 'json',
       contentType: 'application/json;charset=utf-8',
       success: function (jsondata) {
           var data = jsondata.data;
           console.log(data)
           // 使用 $.each() 方法遍歷每個資料項
           $.each(data, function (index, value) {
               // 建立完整的地址字串
               var District = AreaCode_Code.hasOwnProperty(value.AreaCode) ? AreaCode_Code[value.AreaCode] : '';
               var County = County_Code.hasOwnProperty(value.CountyCode) ? County_Code[value.CountyCode] : '';
               var address = County + District + value.StreetDoorPlate;
               setTimeout(function () {
                   $.ajax({
                       type: 'GET',
                       url: wsUrl,
                       data: {
                           oAPPId: AppID, //應用程式識別碼(APPId)
                           oAPIKey: APIKey, // 應用程式介接驗證碼(APIKey)
                           oAddress: address, //所要查詢的門牌位置
                           oSRS: 'EPSG:4326', //回傳的坐標系統
                           oFuzzyType: "0", //模糊比對的代碼
                           oResultDataType: 'JSON', //回傳的資料格式
                           oFuzzyBuffer: "0", //模糊比對回傳門牌號的許可誤差範圍
                           oIsOnlyFullMatch: "false", //是否只進行完全比對
                           oIsSupportPast: "true", //是否顯示舊門牌
                           oIsShowCodeBase: "true", //是否顯示統計區資訊
                           oIsLockCounty: "false", //是否鎖定縣市
                           oIsLockTown: "false", //是否鎖定鄉鎮市區
                           oIsLockVillage: "false", //是否鎖定村里
                           oIsLockRoadSection: "false", //是否鎖定路段
                           oIsLockLane: "false", //是否鎖定巷
                           oIsLockAlley: "false", //是否鎖定弄
                           oIsLockArea: "false", //是否鎖定地區
                           oIsSameNumber_SubNumber: "false", //號之、之號是否視為相同
                           oCanIgnoreVillage: "false", //找不時是否可忽略村里
                           oCanIgnoreNeighborhood: "false", //找不時是否可忽略鄰
                           oReturnMaxCount: "0"//如為多筆時，限制回傳最大筆數
                       }, dataType: 'xml'
                       , success: function (geodata) {
                           console.log(geodata)
                           var data = $(geodata).find('string').text();
                           var geoJSON = JSON.parse(data);
                           // 檢查解析後的資料是否存在
                           if (geodata && geoJSON.AddressList.length > 0) {
                               // 提取經緯度資訊
                               var X = geoJSON.AddressList[0].X;
                               var Y = geoJSON.AddressList[0].Y;
                               $.ajax({
                                   type: 'POST',
                                   url: './api/public_infrastructure',
                                   dataType: 'json',
                                   data: JSON.stringify({
                                       Large_category: '公共設施',
                                       Medium_category: '體育處所屬體育場館',
                                       Small_category: '體育處所屬體育場館',
                                       Landmarkname: value.場館名稱,
                                       District: District,
                                       Address: address,
                                       Tel: value.連絡電話,
                                       X: X,
                                       Y: Y
                                   }),
                                   contentType: 'application/json;charset=utf-8',
                                   success: function () {
                                       console.log('成功匯入')
                                   }, error: function (xhr, status, error) {
                                       console.log("無法讀取資料" + error)
                                   }
                               })
                           } else {
                               console.log("無法解析地址，故不匯入資料庫")
                           }
                       }, error: function (xhr, status, error) {
                           console.log("資料匯入失敗" + error)
                       }
                   })
               }, index * 50)// 設定延遲時間，以便順序執行
           })
       }, error: function (xhr, status, error) {
           console.log("資料匯入失敗")
       }
   })
}

// 在文件載入完成後執行
$(document).ready(function () {
   // 綁定按鈕點擊事件，觸發 public_infrastructure_governmentstadium 函式
   $('#public_infrastructure_governmentstadium').click(function () {
       public_infrastructure_governmentstadium();
   });
});


// 定義一個函式，用於從 API 獲取政府體育場館資料並匯入資料庫
function public_infrastructure_schoolswimmingpool() {
   $.ajax({
       type: 'GET',
       url: 'https://soa.tainan.gov.tw/Api/Service/Get/c4e579fe-462e-41d4-9f8e-63600e2bf790',
       dataType: 'json',
       contentType: 'application/json;charset=utf-8',
       success: function (jsondata) {
           var data = jsondata.data;
           console.log(data)
           // 使用 $.each() 方法遍歷每個資料項
           $.each(data, function (index, value) {
               // 建立完整的地址字串
               var District = AreaCode_Code.hasOwnProperty(value.AreaCode) ? AreaCode_Code[value.AreaCode] : '';
               var County = County_Code.hasOwnProperty(value.CountyCode) ? County_Code[value.CountyCode] : '';
               var address = County + District + value.StreetDoorPlate;
               console.log(address)
               setTimeout(function () {
                   $.ajax({
                       type: 'GET',
                       url: wsUrl,
                       data: {
                           oAPPId: AppID, //應用程式識別碼(APPId)
                           oAPIKey: APIKey, // 應用程式介接驗證碼(APIKey)
                           oAddress: address, //所要查詢的門牌位置
                           oSRS: 'EPSG:4326', //回傳的坐標系統
                           oFuzzyType: "0", //模糊比對的代碼
                           oResultDataType: 'JSON', //回傳的資料格式
                           oFuzzyBuffer: "0", //模糊比對回傳門牌號的許可誤差範圍
                           oIsOnlyFullMatch: "false", //是否只進行完全比對
                           oIsSupportPast: "true", //是否顯示舊門牌
                           oIsShowCodeBase: "true", //是否顯示統計區資訊
                           oIsLockCounty: "false", //是否鎖定縣市
                           oIsLockTown: "false", //是否鎖定鄉鎮市區
                           oIsLockVillage: "false", //是否鎖定村里
                           oIsLockRoadSection: "false", //是否鎖定路段
                           oIsLockLane: "false", //是否鎖定巷
                           oIsLockAlley: "false", //是否鎖定弄
                           oIsLockArea: "false", //是否鎖定地區
                           oIsSameNumber_SubNumber: "false", //號之、之號是否視為相同
                           oCanIgnoreVillage: "false", //找不時是否可忽略村里
                           oCanIgnoreNeighborhood: "false", //找不時是否可忽略鄰
                           oReturnMaxCount: "0"//如為多筆時，限制回傳最大筆數
                       }, dataType: 'xml'
                       , success: function (geodata) {
                           console.log(geodata)
                           var data = $(geodata).find('string').text();
                           var geoJSON = JSON.parse(data);
                           // 檢查解析後的資料是否存在
                           if (geodata && geoJSON.AddressList.length > 0) {
                               // 提取經緯度資訊
                               var X = geoJSON.AddressList[0].X;
                               var Y = geoJSON.AddressList[0].Y;
                               $.ajax({
                                   type: 'POST',
                                   url: './api/public_infrastructure',
                                   dataType: 'json',
                                   data: JSON.stringify({
                                       Large_category: '公共設施',
                                       Medium_category: '各級學校游泳池',
                                       Small_category: value.游泳池類型,
                                       Landmarkname: value.游泳池管理單位,
                                       District: District,
                                       Address: address,
                                       Tel: value.連絡電話,
                                       X: X,
                                       Y: Y
                                   }),
                                   contentType: 'application/json;charset=utf-8',
                                   success: function () {
                                       console.log('成功匯入')
                                   }, error: function (xhr, status, error) {
                                       console.log("無法讀取資料" + error)
                                   }
                               })
                           } else {
                               console.log("無法解析地址，故不匯入資料庫")
                           }
                       }, error: function (xhr, status, error) {
                           console.log("資料匯入失敗" + error)
                       }
                   })
               }, index * 50)// 設定延遲時間，以便順序執行
           })
       }, error: function (xhr, status, error) {
           console.log("資料匯入失敗")
       }
   })
}

// 在文件載入完成後執行
$(document).ready(function () {
   // 綁定按鈕點擊事件，觸發 public_infrastructure_schoolswimmingpool 函式
   $('#public_infrastructure_schoolswimmingpool').click(function () {
       public_infrastructure_schoolswimmingpool();
   });
});


// 定義一個函式，用於從 API 獲取民營運動場館資料並匯入資料庫
function public_infrastructure_privatesportsarena() {
   $.ajax({
       type: 'GET',
       url: 'https://soa.tainan.gov.tw/Api/Service/Get/845e23eb-8099-45cf-9e14-e4e7955b1416',
       dataType: 'json',
       contentType: 'application/json;charset=utf-8',
       success: function (jsondata) {
           var data = jsondata.data;
           console.log(data)
           // 使用 $.each() 方法遍歷每個資料項
           $.each(data, function (index, value) {
               // 建立完整的地址字串
               var District = AreaCode_Code.hasOwnProperty(value.AreaCode) ? AreaCode_Code[value.AreaCode] : '';
               var County = County_Code.hasOwnProperty(value.CountyCode) ? County_Code[value.CountyCode] : '';
               var address = County + District + value.StreetDoorPlate;
               console.log(address)
               setTimeout(function () {
                   $.ajax({
                       type: 'GET',
                       url: wsUrl,
                       data: {
                           oAPPId: AppID, //應用程式識別碼(APPId)
                           oAPIKey: APIKey, // 應用程式介接驗證碼(APIKey)
                           oAddress: address, //所要查詢的門牌位置
                           oSRS: 'EPSG:4326', //回傳的坐標系統
                           oFuzzyType: "0", //模糊比對的代碼
                           oResultDataType: 'JSON', //回傳的資料格式
                           oFuzzyBuffer: "0", //模糊比對回傳門牌號的許可誤差範圍
                           oIsOnlyFullMatch: "false", //是否只進行完全比對
                           oIsSupportPast: "true", //是否顯示舊門牌
                           oIsShowCodeBase: "true", //是否顯示統計區資訊
                           oIsLockCounty: "false", //是否鎖定縣市
                           oIsLockTown: "false", //是否鎖定鄉鎮市區
                           oIsLockVillage: "false", //是否鎖定村里
                           oIsLockRoadSection: "false", //是否鎖定路段
                           oIsLockLane: "false", //是否鎖定巷
                           oIsLockAlley: "false", //是否鎖定弄
                           oIsLockArea: "false", //是否鎖定地區
                           oIsSameNumber_SubNumber: "false", //號之、之號是否視為相同
                           oCanIgnoreVillage: "false", //找不時是否可忽略村里
                           oCanIgnoreNeighborhood: "false", //找不時是否可忽略鄰
                           oReturnMaxCount: "0"//如為多筆時，限制回傳最大筆數
                       }, dataType: 'xml'
                       , success: function (geodata) {
                           console.log(geodata)
                           var data = $(geodata).find('string').text();
                           var geoJSON = JSON.parse(data);
                           // 檢查解析後的資料是否存在
                           if (geodata && geoJSON.AddressList.length > 0) {
                               // 提取經緯度資訊
                               var X = geoJSON.AddressList[0].X;
                               var Y = geoJSON.AddressList[0].Y;
                               $.ajax({
                                   type: 'POST',
                                   url: './api/public_infrastructure',
                                   dataType: 'json',
                                   data: JSON.stringify({
                                       Large_category: '公共設施',
                                       Medium_category: '民營運動場館',
                                       Small_category: value.經營型態,
                                       Landmarkname: value.場館名稱,
                                       District: District,
                                       Address: address,
                                       Tel: value.連絡電話,
                                       X: X,
                                       Y: Y
                                   }),
                                   contentType: 'application/json;charset=utf-8',
                                   success: function () {
                                       console.log('成功匯入')
                                   }, error: function (xhr, status, error) {
                                       console.log("無法讀取資料" + error)
                                   }
                               })
                           } else {
                               console.log("無法解析地址，故不匯入資料庫")
                           }
                       }, error: function (xhr, status, error) {
                           console.log("資料匯入失敗" + error)
                       }
                   })
               }, index * 50)// 設定延遲時間，以便順序執行
           })
       }, error: function (xhr, status, error) {
           console.log("資料匯入失敗")
       }
   })
}

// 在文件載入完成後執行
$(document).ready(function () {
   // 綁定按鈕點擊事件，觸發 public_infrastructure_privatesportsarena 函式
   $('#public_infrastructure_privatesportsarena').click(function () {
       public_infrastructure_privatesportsarena();
   });
});




    // 在文件載入完成後執行
    $(document).ready(function () {
        // 綁定按鈕點擊事件，觸發 importalldata_public_infrastructure 函式
        $('#importalldata_public_infrastructure').click(function () {
            public_infrastructure_park();
            public_infrastructure_library();
            public_infrastructure_publicmarket();
            public_infrastructure_privatemarket();
            public_infrastructure_governmentstadium();
            public_infrastructure_schoolswimmingpool();
            public_infrastructure_privatesportsarena();
        })


        // 綁定按鈕點擊事件，觸發 public_infrastructure_park 函式
        $('#public_infrastructure_park').click(function () {
            public_infrastructure_park();
        });

        // 綁定按鈕點擊事件，觸發 public_infrastructure_library 函式
        $('#public_infrastructure_library').click(function () {
            public_infrastructure_library();
        });

        // 綁定按鈕點擊事件，觸發 public_infrastructure_publicmarket 函式
        $('#public_infrastructure_publicmarket').click(function () {
            public_infrastructure_publicmarket();
        });

        // 綁定按鈕點擊事件，觸發 public_infrastructure_privatemarket 函式
        $('#public_infrastructure_privatemarket').click(function () {
            public_infrastructure_privatemarket();
        });

        // 綁定按鈕點擊事件，觸發 public_infrastructure_governmentstadium 函式
        $('#public_infrastructure_governmentstadium').click(function () {
            public_infrastructure_governmentstadium();
        });

        // 綁定按鈕點擊事件，觸發 public_infrastructure_schoolswimmingpool 函式
        $('#public_infrastructure_schoolswimmingpool').click(function () {
            public_infrastructure_schoolswimmingpool();
        });


        // 綁定按鈕點擊事件，觸發 public_infrastructure_privatesportsarena 函式
        $('#public_infrastructure_privatesportsarena').click(function () {
            public_infrastructure_privatesportsarena();
        });
    });