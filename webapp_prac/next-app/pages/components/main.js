import React, { useState } from 'react'
import Styles from '../../styles/Home.module.css'

export default function Layout_Main(prop) {
    return (
        <>
            <div id={'layout_post'}>
                <Layout_input_File {...prop} />
                <Layout_btn_Upload {...prop} />
            </div>
        </>
    );
}

// ファイル選択コンポーネント
function Layout_input_File(prop) {
    // ファイル選択（未使用）
    function handle_input_onChange(event) {
    }

    return (
        <>
            <input type={'file'} id={prop.ID_input_File} accept={'.jpg, .png'} onChange={handle_input_onChange} className={Styles.input} />
        </>
    );
}

// アップロードコンポーネント
function Layout_btn_Upload(prop) {
    // アップロード
    function handle_btn_onClick(event) {
        // フォームデータオブジェクト生成
        const formData = new FormData();
        // ファイル選択要素取得
        const elem = document.getElementById(prop.ID_input_File);
        
        // フィールドネーム指定してファイル追加（フィールドネームはAPI側multer処理にて認証あり）
        formData.append('file', elem.files[0]);

        // アップロード開始
        fetch('/api/upload', {
            method: 'POST',
            body: formData  // ボディー割当
        }).then(res => res.text())
            .then(data => {
                alert('res => ' + data);
            })
    }

    return (
        <>
            <button id={prop.ID_btn_Upload} onClick={handle_btn_onClick} className={Styles.button} >Upload</button>
        </>
    );
}
