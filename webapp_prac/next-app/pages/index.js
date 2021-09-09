import styles from '../styles/Home.module.css'
import Layout_Main from './components/main'

// 全体に渡すパラメーター
const ID_PROP = {
  ID_input_File: 'input_SelectFile',
  ID_btn_Upload: 'btn_Upload'
}

export default function Home() {
  return (
    <div>
      <Layout_Main {...ID_PROP} />
    </div>
  )
}
