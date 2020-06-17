import Banner from '@components/Slider/Banner';
import Carousel from '@components/Slider/Carousel';
import SpanCategory from '@components/SpanCategory';
import { Fragment } from 'react';
import Link from 'next/link';
import Skeleton from '@components/Skeleton';
import { Grid } from '@material-ui/core';
import { imageSize } from '@config';
import gqlService from './service/graphql';
import useStyles from './style';
import Thumbor from '../../components/Image';

const BannerSliderSkeleteon = () => {
    const styles = useStyles();
    return (
        <div className={styles.skeletonWrapper}>
            <Skeleton
                variant="rect"
                animation="wave"
                xsStyle={{ width: '100%', height: '60vw' }}
                mdStyle={{ width: '100%', height: '577px' }}
            />
        </div>
    );
};

const BannerSlider = ({ storeConfig }) => {
    const styles = useStyles();
    const logoUrl = `${storeConfig.secure_base_media_url}logo/${storeConfig.header_logo_src}`;
    const { loading, data, error } = gqlService.getBannerSlider();

    if (loading) {
        return <BannerSliderSkeleteon />;
    }
    if (error) return <p>{`Error: ${error.message}`}</p>;
    if (!data) return <p>Not found</p>;

    const bannerImages = data.getHomepageSlider.images.map((image) => ({
        imageUrl: image.mobile_image_url || image.image_url,
        link: image.url_redirection,
    }));

    return (
        <>
            <div className={styles.header}>
                <div className={styles.logo}>
                    <img src={logoUrl} alt="logo" className={styles.imgLogo} />
                </div>
                {bannerImages && bannerImages.length && <Banner data={bannerImages} />}
            </div>
        </>
    );
};

const FeaturedProductsSkeleton = () => {
    const styles = useStyles();
    const SliderSkeleton = () => (
        <>
            <Skeleton
                className={styles.skeleton}
                variant="rect"
                animation="wave"
                width="100%"
                xsStyle={{ height: '60vw' }}
                smStyle={{ height: '42vw' }}
                mdStyle={{ height: '375px' }}
            />
            <Skeleton className={styles.skeleton} variant="rect" width="25%" height={10} animation="wave" />
            <Skeleton className={styles.skeleton} variant="rect" width="75%" height={10} animation="wave" />
        </>
    );
    return (
        <div className={styles.skeletonWrapper}>
            <Grid container>
                <Grid item md={1} display={{ xs: 'none', md: 'block' }}>
                    <SliderSkeleton />
                </Grid>
                <Grid item xs={3} md={3} sm={4} style={{ padding: '0 6px 0 12px' }}>
                    <SliderSkeleton />
                </Grid>
                <Grid item xs={6} md={4} sm={4} style={{ padding: '0 6px' }}>
                    <SliderSkeleton />
                </Grid>
                <Grid item xs={3} md={3} sm={4} style={{ padding: '0 12px 0 6px' }}>
                    <SliderSkeleton />
                </Grid>
                <Grid item md={1} display={{ xs: 'none', md: 'block' }}>
                    <SliderSkeleton />
                </Grid>
            </Grid>
        </div>
    );
};

const FeaturedProducts = () => {
    const styles = useStyles();
    const { loading, data, error } = gqlService.getFeaturedProducts({
        url_key: 'homepage-featured-products',
    });

    if (loading) return <FeaturedProductsSkeleton />;
    if (error) return <p>{`Error: ${error.message}`}</p>;
    if (!data) return <p>Not found</p>;

    return (
        <>
            {data.categoryList[0].children.map((category, i) => {
                const products = category.products.items.map((product) => ({
                    ...product,
                    name: product.name,
                    url: product.url_key,
                    imageSrc: product.small_image.url,
                    price: product.price_range.minimum_price.regular_price.value,
                }));
                return (
                    <Fragment key={i}>
                        {category.image_path && (
                            <Link href="[...slug]" as={category.url_path}>
                                <a>
                                    <Thumbor
                                        src={category.image_path}
                                        alt={category.name}
                                        style={{
                                            width: '100%',
                                            maxWidth: '100%',
                                            maxHeight: '100%',
                                        }}
                                        width={imageSize.category.width}
                                        height={imageSize.category.height}
                                        quality={80}
                                    />
                                </a>
                            </Link>
                        )}
                        <div className={styles.slider}>
                            <Carousel data={products} />
                        </div>
                    </Fragment>
                );
            })}
        </>
    );
};

const CategoryListSkeleteon = () => {
    const styles = useStyles();
    return (
        <div className={styles.skeletonWrapper}>
            <Grid container spacing={2} direction="column" alignItems="center">
                <Skeleton
                    className={styles.skeleton}
                    variant="rect"
                    width="100%"
                    xsStyle={{ height: '60vw' }}
                    mdStyle={{ height: '577px' }}
                    animation="wave"
                />
                <Skeleton className={styles.skeleton} style={{ alignSelf: 'center' }} variant="rect" width="35%" height={10} animation="wave" />
                <Skeleton className={styles.skeleton} variant="rect" width="75%" height={10} animation="wave" />
            </Grid>
        </div>
    );
};

const CategoryList = ({ storeConfig }) => {
    const styles = useStyles();
    const { loading, data, error } = gqlService.getCategoryList({
        url_key: 'homepage-featured-categories',
    });

    if (loading) return <CategoryListSkeleteon />;
    if (error) return <p>{`Error: ${error.message}`}</p>;
    if (!data) return <p>Not found</p>;

    return (
        <>
            {data.categoryList[0].children.map((category, i) => (
                <div className={styles.slider} key={i}>
                    <SpanCategory
                        storeConfig={storeConfig}
                        imageSrc={category.image_path}
                        name={category.name}
                        description={category.description}
                        url={category.url_path}
                    />
                </div>
            ))}
        </>
    );
};

const HomePage = ({ storeConfig }) => {
    const styles = useStyles();
    return (
        <div className={styles.container}>
            <BannerSlider storeConfig={storeConfig} />
            <FeaturedProducts storeConfig={storeConfig} />
            <CategoryList storeConfig={storeConfig} />
        </div>
    );
};

export default HomePage;
