import fs from 'fs'

// API処理
export default function handler(req, res) {
    try {
        // ファイル読み込み
        const Buffer = fs.readFileSync('public/uploads/' + req.query.filename);

        // ヘッダー設定して送信
        res.setHeader('Content-Type', 'image/jpg');
        res.send(Buffer);

    } catch (error) {
        // 主にファイル見当たらない場合
        res.status(400).json({'message': 'File Not Found'});
    }
}