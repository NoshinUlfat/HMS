import "./home.scss"
import Form from "./../../../components/form/Form"

const Home = () => {
  return (
    <div className='home'>
        <div className="left">
          <div className="leftcontent">
            <h1>Welcome to Titumir Hall</h1>
            <h3>Login to continue   --&gt; </h3>
          </div>
        </div>
        <div className="right"><Form/></div>
    </div>
  )
}

export default Home