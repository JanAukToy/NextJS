import Styles from '../styles/Home.module.css'
import Layout_Main from './components/main'

// 全体に渡すパラメーター
const PROP = {
  ID_input_File: 'input_SelectFile',
  ID_btn_Upload: 'btn_Upload',
  ID_Image: 'img_NextImage',
  FILENAME_Upload: 'upload.png'
}

export default function Home() {
  return (
    <div className={Styles.maincontainer}>
      <Layout_Main {...PROP} />
    </div>
  )
}
