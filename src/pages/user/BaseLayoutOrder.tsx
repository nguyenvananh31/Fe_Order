import SideBarsOrder from '../../layout/users/component/SideBarsOrder/SideBarsOrder';
import Order from './Order/Order';

const BaseLayoutOrder = () => {
  return (
    <div className='wrapper flex'>
      <SideBarsOrder />
      <Order />
    </div>
  )
}

export default BaseLayoutOrder