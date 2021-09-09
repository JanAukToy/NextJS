import nextConnect from 'next-connect';
import multer from 'multer';

// multer処理（オプション設定）
const upload = multer({
    storage: multer.diskStorage({
        // 保存先
        destination: './public/uploads/',
        // ファイル名
        filename: (req, file, cb) => cb(null, Get_FileName(file.originalname)),
    }),
});

// nextConnect取得、エラーファンクション設定
const apiRoute = nextConnect({
    onError(error, req, res) {
        res.status(501).json({ error: `${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

// multerファイル保存をミドルウェアとして指定（Field:fileのみ受付）
apiRoute.use((req, res, next) => {
    // メソッドタイプと保存するファイルか確認
    if ((req.method === "POST") && (is_Correct(req))){
        // multer処理へ（ファイル保存）
        next();
    }    
},
// single'file'はフィールドネームのフィルタリング　post時に指定しているのと合致しないと保存できない 
upload.single('file'));

// レスポンス
apiRoute.post((req, res) => {
    res.status(200).json({status: 'success!'});
});

// ミドルウェア指定のコンポーネントとしてセット
export default apiRoute;

// API設定（https://nextjs-ja-translation-docs.vercel.app/docs/api-routes/api-middlewares）
export const config = {
    api: {
        bodyParser: false,
    },
};

// 保存するか否か判断
function is_Correct(req){
    // const id = req.query.id;     // クエリーパラメーター
    // const key = req.query.key;   // クエリーパラメーター
    // const file = req.file.originalname;  // ファイル名
    
    // テストのため全スルー
    return true;
}

// 保存名変更ハンドラ
function Get_FileName(original_name){
    // テストのため全スルー
    return original_name;
}