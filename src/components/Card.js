import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import alanBtn from '@alan-ai/alan-sdk-web';

const Card = () => {
  const [mainCart, setMainCart] = useState([]);
  const [cart, setCart] = useState([]);
  const [isModal, setIsModal] = useState(false);

  const addCartHandler = (item) => {
    setCart(prev => [...prev, item]);
    toast.success('Product added successfuly');
  }

  useEffect(() => {
    alanBtn({
      key: '1a9fe778f06fac56e6962d7c8e42b98d2e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: (commandData) => {
        if (commandData.command === 'getMenu') {
          setMainCart(commandData.data);
        }
      }
    });
  }, [])


  return (
    <div className='album py-5 bg-light'>
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3">
          {mainCart.map(item => (
            <div key={item.id} className="col">
              <div className="card shadow-sm p-3">
                <div className="card-title">
                  <h4 className='text-muted text-center'>Product #{item.id}</h4>
                </div>
                <img src={item.image} alt={item.title} width={'100%'} height={"400px"} className="bg-placeholder card-image-top" style={{ objectFit: 'cover' }} />
                <div className="card-body">
                  <p className="card-text">{item.title.slice(0, 20)}</p>
                  <p className='card-text fw-lighter'>{item.description.slice(0, 90)}</p>
                </div>
                <div className="card-footer d-flex align-items-center justify-content-between">
                  <div>
                    <span>{item.category}</span>
                  </div>
                  <span>{item.price}$</span>
                </div>
                <button className="mt-3 btn btn-outline-primary" onClick={() => addCartHandler(item)}>Add Card</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="fixed-top m-3">
        <button type='button' className='btn btn-primary position-relative' onClick={() => setIsModal(prev => !prev)}>
          Card
          <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>
            {cart.length === 0 ? '' : cart.length}
          </span>
          <span className='visually-hidden'>unread messege</span>
        </button>
      </div>
      {isModal && <div className="modal" tabindex="-1" role="dialog" style={{ display: 'block', background: 'rgba(0,0,0,.8)' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modal title</h5>
              <button className='btn btn-danger' onClick={() => setIsModal(prev => !prev)}>X</button>
            </div>
            <div className="modal-body">
              {cart.map(item => (
                <div className="card mb-3">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img src={item.image} alt={item.title} className='img-fluid rounded-start' />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{item.title}</h5>
                        <p className='card-text text-muted'>{item.description.slice(0, 100)}</p>
                        <p className="card-text">
                          <small className='text-muted'>${item.price}</small>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary">Close</button>
            </div>
          </div>
        </div>
      </div>}
    </div>
  )
}

export default Card;