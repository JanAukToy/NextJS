import React, { useEffect, useState } from 'react'
import Styles from '../../styles/Home.module.css'
import Image from 'next/image'
import DefaultImage from '../../public/favicon.ico'

export default function Layout_Main(prop) {
    return (
        <>
            <div className={Styles.control_container}>
                <Layout_input_File {...prop} />
                <Layout_btn_Upload {...prop} />
                <Layout_btn_Show {...prop} />
            </div>
            <div className={Styles.image_container}>
                <Layout_Image {...prop} src={DefaultImage} />
            </div>
        </>
    );
}

// ファイル選択コンポーネント
function Layout_input_File(prop) {
    // ファイル選択（未使用）
    async function handle_input_onChange(event) {
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
    async function handle_btn_onClick(event) {
        // フォームデータオブジェクト生成
        const formData = new FormData();
        // ファイル選択要素取得
        const elem = document.getElementById(prop.ID_input_File);

        // フィールドネーム指定してファイル追加（フィールドネームはAPI側multer処理にて認証あり）
        formData.append('file', elem.files[0]);

        // アップロード開始
        await fetch('/api/upload', {
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

// 画像表示ボタンコンポーネント
function Layout_btn_Show(prop) {
    // 画像表示
    async function handle_btn_onClick(event){
        // 要素取得
        const Elem_InputFile = document.getElementById(prop.ID_input_File);
        const Elem_Image = document.getElementById(prop.ID_Image);
        
        // インプットファイル存在可否掴んでファイル要求（Next.jsの静的ファイルルーティング使用するためにicoを事前に保管してある）
        if (Elem_InputFile.files[0] != null){
            // ブラウザキャッシュ回避で時間付与（毎回読み込み）
            const date = new Date;
            Elem_Image.src='/uploads/' + prop.FILENAME_Upload + '?' + date.getTime();
        }else{
            alert('Please Input File!');
        }
    }

    return (
        <>
            <button id={prop.ID_btn_Upload} onClick={handle_btn_onClick} className={Styles.button} >Show</button>
        </>
    );
}

// 画像表示コンポーネント
function Layout_Image(prop) {
    return (
        <>
            <Image id={prop.ID_Image} unoptimized={true} src={prop.src} className={Styles.image} layout={'fill'} objectFit={'scale-down'} />
        </>
    );
}
