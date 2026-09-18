<script>

</script>

<template>

    <main class="page">

        <section class="hero">

            <h1>Top Hair Trend of Fall 2026</h1>

            <p>K.KAI HAIR ACADEMIC LONDON</p>

        </section>

        <div id="container">
            <div class="box">
                <div class="box_img">
                    <img class="img" src="../../public/img/8.jpg" width="500" height="750" alt="這是圖片介紹11">
                </div>
            </div>
            <div class="box">
                <div class="box_img">
                    <img class="img" src="../../img/9.jpg" width="500" height="566" alt="這是圖片介紹">
                </div>
            </div>
            <div class="box">
                <div class="box_img">
                    <img class="img" src="../../img/10.jpg" width="500" height="309" alt="這是圖片介紹">
                </div>
            </div>
            <div class="box">
                <div class="box_img">
                    <img class="img" src="../../img/11.jpg" width="532" height="300" alt="這是圖片介紹">
                </div>
            </div>
            <div class="box">
                <div class="box_img">
                    <img class="img" src="../../img/12.jpg" width="500" height="330" alt="這是圖片介紹">
                </div>
            </div>
            <div class="box">
                <div class="box_img">
                    <img class="img" src="../../img/13.jpg" width="500" height="376" alt="這是圖片介紹">
                </div>
            </div>
            <div class="box">
                <div class="box_img">
                    <img class="img" src="../../img/14.jpg" width="500" height="728" alt="這是圖片介紹">
                </div>
            </div>
            <div class="box">
                <div class="box_img">
                    <img class="img" src="../../img/15.jpg" width="500" height="750" alt="這是圖片介紹">
                </div>
            </div>
            <div class="box">
                <div class="box_img">
                    <img class="img" src="../../img/16.jpg" width="500" height="566" alt="這是圖片介紹">
                </div>
            </div>
            <div class="box">
                <div class="box_img">
                    <img class="img" src="../../img/22.jpg" width="500" height="309" alt="這是圖片介紹">
                </div>
            </div>
            <div class="box">
                <div class="box_img">
                    <img class="img" src="../../img/23.jpg" width="532" height="300" alt="這是圖片介紹">
                </div>
            </div>
            <div class="box">
                <div class="box_img">
                    <img class="img" src="../../img/28.jpg" width="500" height="330" alt="這是圖片介紹">
                </div>
            </div>
            <div class="box">
                <div class="box_img">
                    <img class="img" src="../../img/30.jpg" width="500" height="376" alt="這是圖片介紹">
                </div>
            </div>
            <div class="box">
                <div class="box_img">
                    <img class="img" src="../../img/27.jpg" width="500" height="728" alt="這是圖片介紹">
                </div>
            </div>
            <div class="box">
                <div class="box_img">
                    <img class="img" src="../../img/25.jpg" width="500" height="750" alt="這是圖片介紹">
                </div>
            </div>
            <div class="box">
                <div class="box_img">
                    <img class="img" src="../../img/21.jpg" width="500" height="566" alt="這是圖片介紹">
                </div>
            </div>
            <div class="box">
                <div class="box_img">
                    <img class="img" src="../../img/26.jpg" width="500" height="309" alt="這是圖片介紹">
                </div>
            </div>
            <div class="box">
                <div class="box_img">
                    <img class="img" src="../../img/20.jpg" width="532" height="300" alt="這是圖片介紹">
                </div>
            </div>
            <div class="box">
                <div class="box_img">
                    <img class="img" src="../../img/5.jpg" width="500" height="330" alt="這是圖片介紹">
                </div>
            </div>
            <div class="box">
                <div class="box_img">
                    <img class="img" src="../../img/c234ec5af2ba41812a55ca53f53b8750.jpg" width="500" height="376" alt="這是圖片介紹">
                </div>
            </div>
            <div class="box">
                <div class="box_img">
                    <img class="img" src="../../img/7.jpg" width="500" height="728" alt="這是圖片介紹">
                </div>
            </div>

            <!-- 彈出式視窗 -->
            <div class="modal" id="myModal">
                <!-- 關閉按鈕-->
                <span class="close" @click="closeDialog">&times;</span>
                <!-- 彈出式視窗的內容 -->
                <img class="modal-content" id="popup_img">
                <!-- 顯示圖片描述 -->
                <div id="caption"></div>
            </div>

        </div>

    </main>

</template>

<style scoped>
* {
    margin: 0;
    padding: 0;
}

#container {
    position: relative;
}

.box {
    float: left;
    padding: 5px;
    transition: all 2s;
}

.box_img {
    padding: 5px;
    border: 1px solid #ccc;
    box-shadow: 0 0 5px #ccc;
    border-radius: 5px;
}

.box_img img {
    width: 250px;
    height: auto;
    cursor: pointer;
}


/* 彈出式視窗的部分 */
.modal {
    position: fixed;
    /* Sit in place*/
    z-index: 1;
    /* 設定在最頂層*/
    padding-top: 8vh;
    /* 圖片與上緣的距離*/
    left: 0;
    /*使視窗填滿左側*/
    top: 0;
    /*使視窗填滿上方*/
    width: 100%;
    /*填滿所有寬度*/
    height: 100%;
    /*填滿所有高度*/
    background-color: rgba(0, 0, 0, 0.8);
    /*背景顏色*/
    display: none;
    /*預設隱藏*/
}

/* 彈出式視窗中的圖片*/

.modal-content {
    /* 讓圖片置中對齊 */
    margin: auto;
    display: block;
    max-height: 80vh;
    max-width: 80vw;
}

/* 彈出式視窗中的文字*/

#caption {
    margin: auto;
    display: block;
    width: 80vw;
    max-width: 800px;
    text-align: center;
    color: #ccc;
    padding: 10px;
    height: 150px;
}

/* 加入動畫*/

.modal-content,
#caption {
    /* -webkit-animation-name: zoom; */
    /*定義動畫名稱*/
    /* -webkit-animation-duration: 0.6s; */
    /*指定動畫持續時間*/
    animation-name: zoom;
    animation-duration: 0.6s;
}

@keyframes zoom {
    from {
        transform: scale(0)
    }

    to {
        transform: scale(1)
    }
}

/* 關閉按鈕 */

.close {
    position: absolute;
    top: 15px;
    right: 35px;
    color: white;
    font-size: 40px;
    font-weight: bold;
    transition: 0.3s;
}

.close:hover,
.close:focus {
    color: #bbb;
    cursor: pointer;
}

/* 小於700px的螢幕中將寬度設為100% */

@media screen and (max-width: 700px) {
    .modal-content {
        max-width: 100vw;
    }
}
</style> 