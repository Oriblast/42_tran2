import NavBar from './../components/NavBar';

const Login = () => {
  return (
    <div className="home-container mt-5">
      <NavBar />
      <section className="">
        <div className="container py-5">
          
          <section className="ftco-section">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-12 col-lg-10">
                  <div className="wrap d-md-flex">
                    <div className="blur-shadow-image text-center">
                      <img src="https://media1.giphy.com/media/pWncxUrrNHdny/giphy.gif?cid=ecf05e47pq0cwp7heqghew8fz4nvhwru99quo21mbrpgb8cs&ep=v1_gifs_search&rid=giphy.gif&ct=g" alt="ping pong" />
                    </div>
                    <div className="login-wrap p-4 p-md-5">
                      <div className="d-flex">
                        <div className="w-100">
                          <h3 className="mb-4">Connexion</h3>
                        </div>
                      </div>
                      <form action="#" className="signin-form">
                        <div className="form-group mb-3">
                          <label className="label" htmlFor="name">Username</label>
                          <input type="text" className="form-control" placeholder="Username" required />
                        </div>
                        <div className="form-group mb-3">
                          <label className="label" htmlFor="password">password</label>
                          <input type="password" className="form-control" placeholder="mot de pass" required />
                        </div>
                        <div className="form-group">
                          <button type="submit" className="form-control btn btn-primary rounded submit px-3">Connexion</button>
                        </div>
                        <div className="form-group d-md-flex">
                          <div className="w-50 text-centre mt-3">
                            <label className="checkbox-wrap checkbox-primary mb-0 ms-3">
                              
                              <span className="checkmark ms-2"></span>
                            </label>
                          </div>
                          <div className="w-50 text-md-centre mt-3">
                            <a href="#"></a>
                          </div>
                        </div>
                      </form>
                      {/* <p className="text-center">Not a member? <a data-toggle="tab" href="#signup">Sign Up</a></p> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  )
}

export default Login