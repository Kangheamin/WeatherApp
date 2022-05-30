$(document).ready(function(){
    //0cbbcfd75675e069d048c9388c99ecb2
    //https://api.openweathermap.org/data/2.5/weather?q=busan&appid=41544b0ae8d6ea4f6b29201a0e6e6add

    let cityName = []; //버튼 클릭 시 검색바에서 입력 후 엔터를 누를 시, 도시명 데이터를 수집한다.
    console.log(cityName); //[];

    var myAPI = `0cbbcfd75675e069d048c9388c99ecb2`;

    let state_icon = "";  //텍스트 아이콘을 이미지 아이콘으로 변경할 수 있는 데이터
    let w_box = `  <li>
    <div class="top">
        <div class="cur_icon">
            <i class="wi"></i>
        </div>
        <div class="info">
            <p class="temp"><span class="degree">22</span>&nbsp;℃</p>
            <p class="interTemp">
                최저 <span class="temp_min">9</span>℃ / 
                최고 <span class="temp_max">25</span>℃
            </p>
            <h4>Clear</h4>
            <p class="location">
                <span class="city">Busan</span>, 
                <span class="nation">KR</span>
            </p>
        </div>
    </div>

    <div class="bottom">
        <div class="wind">
            <i class="wi wi-strong-wind"></i>
            <p><span>0.00</span>m/s</p>
        </div>
        <div class="humidity">
            <i class="wi wi-humidity"></i>
            <p><span>00</span>%</p>
        </div>
        <div class="cloud">
            <i class="wi wi-cloudy"></i>
            <p><span>00</span>%</p>
        </div>
    </div>
</li>`

function w_info() {

    $('#weather ul').empty();
    
    for(v of cityName){
        $('#weather ul').append(w_box);
    }
    //append(), perpend()자식을 추가하는 메서드는 기존 자식을 남기는 상태에서 새로운 자식들을 추가

    $("#weather ul li").each(function(index){

    
    //ajax 구문의 시작 /////
        $.ajax({
            url : `https://api.openweathermap.org/data/2.5/weather?q=${cityName[index]}&appid=${myAPI}`,
            dataType : "json",
            success : function(data){
                console.log(data);
                let weather = data.weather[0].main;
                console.log("현재 날씨 : " + weather);
                let temp = Math.round(data.main.temp - 273.15);
                console.log("현재 온도 : " + temp);
                let min_temp = Math.round(data.main.temp_min - 273.15);
                console.log("최저 온도 : " + min_temp);
                let max_temp = Math.round(data.main.temp_max - 273.15);
                console.log("최고 온도 : " + max_temp);
                let city = data.name;
                console.log("도시명 : " + city);
                let nation = data.sys.country;
                console.log("국가명 : " + nation);
                let wind = data.wind.speed;
                console.log("현재 풍속 : " + wind);
                let humidity = data.main.humidity;
                console.log("현재 습도 : " + humidity);
                let cloud = data.clouds.all;
                console.log("구름 양 : " + cloud);

                //텍스트화 된 날씨(변수명 weather) 데이터 이미지를 아이콘으로 변경
                if(weather == "Clear") state_icon = "wi-day-sunny";
                else if(weather == "Clouds") state_icon = "wi-cloud";
                else if(weather == "Rain") state_icon = "wi-rain";
                else if(weather == "Snow") state_icon = "wi-snow";
                else if(weather == "Mist") state_icon = "wi-fog";
                else if(weather == "Haze") state_icon = "wi-day-haze";
                

                $("#weather li").eq(index).find(".cur_icon i").addClass(state_icon);
                $("#weather li").eq(index).find(".temp .degree").text(temp);
                $("#weather li").eq(index).find(".temp_min").text(min_temp);
                $("#weather li").eq(index).find(".temp_max").text(max_temp);
                $("#weather li").eq(index).find("h4").text(weather);
                $("#weather li").eq(index).find(".city").text(city);
                $("#weather li").eq(index).find(".nation").text(nation);
                $("#weather li").eq(index).find(".wind span").text(wind);
                $("#weather li").eq(index).find(".humidity span").text(humidity);
                $("#weather li").eq(index).find(".cloud span").text(cloud);
            }
        });
        // ajax 구문의 종료 ///////
    });
}

$(document).on('click', ".cities button", function(){
    console.log(this);
    let city_txt = $(this).text(); //클릭한 곳의 텍스트 추출
    console.log(city_txt);

    cityName.unshift(city_txt);
    console.log(cityName);

    $(this).remove(); //클릭한곳의 버튼 제거

    w_info();
});

    function searching(){
        var search_val = $("#search_box").val();
        if(search_val.trim() == ""){
            alert("검색어를 입력 바랍니다");
            $("#search_box").focus();
        }else{
            cityName.unshift(search_val);
            w_info();
        }
    }

    $(".search button").click(function(){
        searching();
    });
    $("#search_box").keydown(function(e){
        if(e.keyCode == "13"){
            searching();
        }
    })
   //현재 나의 위치 정보를 가져와서 해당하는 날씨를 보여준다.
   //https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid={API key}        
   navigator.geolocation.getCurrentPosition(function(position){
        console.log(position);
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        console.log(latitude);
        console.log(longitude);

        $.ajax({
            url : `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${myAPI}`,
            dataType : "json",
            success : function(data){
                console.log(data);
                var city = data.name;
                console.log(city);

                cityName.unshift(city); //브라우저가 로딩하자마자 현재 나의위치를 배열 데이터에 넣는다
                w_info();//함수문을 호출한다 => 배열데이터 갯수에 따라 구조를 구성하고 그 데이터
            }

        })

   })
});