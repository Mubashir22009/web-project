import FooterItemsContainer from './FooterItemsContainer';
import FooterSocialMediaIcon from './FooterSocialMediaIcon';
import { ICONS } from '../Data/Content';

const Footer = () => {
    return (
        <footer className="bg-black text-gray-300">
            <FooterItemsContainer />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center pt-4
             text-gray-500 text-sm pb-6">
                <span>© 2024 ABC Inc. All rights reserved.</span>
                <span>Terms & Privacy Policy</span>
                <FooterSocialMediaIcon Icons={ICONS} />
            </div>

        </footer>
    );
}

export default Footer;