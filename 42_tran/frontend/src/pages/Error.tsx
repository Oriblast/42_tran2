import NavBar from './../components/NavBar';

const Error = () => {
  return (
    <div className="home-container">
        <NavBar />
        <section className="">
            <div className="container py-5">
              <h1>404</h1>
              <h2>Page not found</h2>
            </div>
        </section>
    </div>
  )
}

export default Error