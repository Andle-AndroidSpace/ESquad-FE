import { Link } from "react-router-dom";

const MenuLink = ({link, menu}) => {
   return ( 
      <Link to={link}
            className="text-left text-white hover:bg-gray-700 p-2 rounded-md block"
      ># {menu}</Link> 
   );
}
 
export default MenuLink;