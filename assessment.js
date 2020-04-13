'use strict';

//htmlに設定したidを使って、要素を取得する
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');


/**
 * 指定したHTML要素の子要素をすべて削除する関数
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element){

    //子要素がある限り実行
    while(element.firstChild){
        //removeChildren : 指定された子要素を削除する
        element.removeChild(element.firstChild);
    }

}



// = function(){... つまり無名関数を簡単に書くことができる
// => : アロー関数
assessmentButton.onclick = () => {
    //valueプロパティを使って、テキストエリアに入力された文字列を受け取る
    const userName = userNameInput.value;
    if (userName.length === 0){
        return;
    }

    removeAllChildren(resultDivided);
    

    //診断結果表示エリアの作成
    //creatElement : 要素(<p></p>や<h3></h3>)を作成する
    const header = document.createElement('h3');
    //innerText : 内側のテキスト
    header.innerText = '診断結果';
    //div要素を親として、子要素にheader（<h3>診断結果</h3>）を追加する
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);
    //つまり
    //resultDivided>paragraph : テキストはresult


    //ツイートエリアの作成
    removeAllChildren(tweetDivided);

    //jsでツイートボタンを書き直す
    const anchor = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
     + encodeURIComponent('あなたのいいところ')
     + '&ref_src=twsrc%5Etfw'

    //setAttribute 指定した要素に、新しい属性を追加する
    //または、指定の要素に存在する属性の値を変更する
    anchor.setAttribute('href', hrefValue);

    //element.className class属性の値の取得や設定に用いる
    anchor.className = 'twitter-hashtag-button';

    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #あなたのいいところ'

    tweetDivided.appendChild(anchor);
    //埋め込みボタンを作る
    twttr.widgets.load();
}

userNameInput.onkeydown = (event) => {
    if (event.key === 'Enter'){
        assessmentButton.onclick();
    }
}


const answers = [
    '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
    '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
    '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
    '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
    '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
    '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
    '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
    '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
    '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
    '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
    '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
    '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
    '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
    '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
    '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。',
    '{userName}のいいところは優しさです。あなたの優しい雰囲気や立ち振る舞いに多くの人が癒やされています。',
    '{userName}のいいところは穏やかさです。あなたの穏やかな雰囲気や立ち振る舞いに多くの人が癒やされています。'
];

/**
 * 名前の文字列を渡すと、診断結果を返す
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */

 function assessment(userName){
     //全文字のコード番号を取得して足して合わせる
     let sumOfCharCode = 0;
     for (let i = 0; i < userName.length; i++){
        sumOfCharCode += userName.charCodeAt(i);
     }

     //文字のコード番号の合計を回答の数で割って添字の数値を求める
     let index = sumOfCharCode % answers.length;
     let result = answers[index];
     result = result.replace(/\{userName\}/g, userName);

     return result;
 }

 console.log(assessment('太郎'));
 console.log(assessment('次郎'));
 console.log(assessment('太郎'));

 console.assert(
     assessment('太郎') === '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);



console.assert(
    assessment('太郎')===assessment('太郎'),
    '入力が同じ名前なのに、異なる診断結果が出力されています'
);
// 最後の ; を忘れがちなので注意する（2020/03/06）
