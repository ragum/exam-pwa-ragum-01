/* eslint-disable no-nested-ternary */
import Button from '@common_button';
import Typography from '@common_typography';
import React from 'react';
import propTypes from 'prop-types';
import Category from '@core_modules/blog/components/Category';

const Content = ({
    t, data, loadMore, loading, handleLoadMore, page, loadCategory,
    storeConfig, ContentCategory, ContentItem, ...other
}) => (
    <div className="flex flex-row">
        <div className="xs:basis-full sm:basis-2/12">
            <Category t={t} {...other} />
        </div>
        <div className="xs:basis-full sm:basis-10/12">
            <Typography variant="h1" style={{ display: 'none' }}>
                Blog
            </Typography>
            {data
                    && data.getBlogByFilter.items.length > 0
                    && data.getBlogByFilter.items.map((blog, index) => <ContentItem storeConfig={storeConfig} key={index} short {...blog} t={t} />)}
            {data && data.getBlogByFilter.total_count > data.getBlogByFilter.items.length && data.getBlogByFilter.total_pages > page && (
                <Button variant="plain" onClick={handleLoadMore} disabled={loading || loadMore} fullWidth>
                    <Typography variant="span" type="bold" letter="uppercase" color="gray">
                        {loadMore || loading ? 'Loading ...' : t('blog:loadMore')}
                    </Typography>
                </Button>
            )}
        </div>
    </div>
);

Content.prototype = {
    t: propTypes.func.isRequired,
    data: propTypes.array.isRequired,
    loadMore: propTypes.func.isRequired,
    loading: propTypes.bool.isRequired,
    handleLoadMore: propTypes.func.isRequired,
    page: propTypes.number.isRequired,
    loadCategory: propTypes.any.isRequired,
    ContentItem: propTypes.func.isRequired,
    ContentCategory: propTypes.func.isRequired,
};

export default Content;
