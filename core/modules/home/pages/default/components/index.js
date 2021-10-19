/* eslint-disable max-len */
import { modules } from '@config';
import dynamic from 'next/dynamic';
// import BannerSlider from '@core_modules/home/pages/default/components/Banner';
import FeaturedProducts from '@core_modules/home/pages/default/components/FeaturedProducts';
import CategoryList from '@core_modules/home/pages/default/components/CategoryList';
import useStyles from '@core_modules/home/pages/default/components/style';

const BannerSlider = dynamic(() => import('@core_modules/home/pages/default/components/Banner'), { ssr: false });

const Content = (props) => {
    const styles = useStyles();
    const {
        BannerSliderSkeleton, BannerView, FeaturedSkeleton, FeaturedView, CategoryListSkeleton, CategoryListView, CmsPage, ...other
    } = props;
    const { useCmsPage } = modules.home;

    if (useCmsPage.enable) return <CmsPage onlyCms slug={[useCmsPage.identifier]} withLayoutHeader={false} withLayoutFooter={false} withCmsTitle={false} {...other} />;

    return (
        <div className={styles.container}>
            <BannerSlider BannerSliderSkeleton={BannerSliderSkeleton} BannerView={BannerView} {...other} />
            <FeaturedProducts FeaturedView={FeaturedView} FeaturedSkeleton={FeaturedSkeleton} {...other} />
            <CategoryList CategoryListSkeleton={CategoryListSkeleton} CategoryListView={CategoryListView} {...other} />
        </div>
    );
};

export default Content;
