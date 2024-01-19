import { formatPrice } from '@helper_currency';
import formatDate from '@helper_date';
import Layout from '@layout_customer';
import cx from 'classnames';
import Typography from '@common_typography';
import Show from '@common_show';
import Select from '@common_forms/Select';
import Pagination from '@common_pagination';
import Skeleton from '@common_skeleton';
import SkeletonStoreCredit from '@core_modules/storecredit/pages/default/components/skeleton';
import Alert from '@common_alert';

const StoreCreditPage = (props) => {
    const {
        t, storeCredit, loading, rowsPerPage, page, handleChangePage, handleChangeRowsPerPage, currencyCache,
    } = props;

    const hasTransaction = storeCredit?.transaction_history?.items && storeCredit?.transaction_history?.items?.length > 0;
    const pageInfo = storeCredit?.transaction_history?.page_info;
    const totalCount = storeCredit?.transaction_history?.total_count ?? 0;

    const PaginationComponent = () => (
        <div
            className={cx(
                'table-data pt-6 flex justify-between',
                'tablet:items-center tablet:flex-row',
                'mobile:flex-col',
            )}
        >
            <div className="flex justify-between items-center flex-1">
                <Typography className={cx('font-normal', 'leading-2lg')}>{`${totalCount ?? 0} ${t('common:label:data')}`}</Typography>
                <div className="flex items-center">
                    <Typography className={cx('font-normal', 'leading-2lg', 'p-3')}>{t('common:label:show')}</Typography>
                    <Select
                        name="show"
                        value={rowsPerPage}
                        onChange={handleChangeRowsPerPage}
                        options={[
                            {
                                label: 10,
                                value: 10,
                            },
                            {
                                label: 20,
                                value: 20,
                            },
                            {
                                label: 50,
                                value: 50,
                            },
                            {
                                label: t('common:label:all'),
                                value: totalCount,
                            },
                        ]}
                        textFiledProps={{ className: cx('w-[80px]') }}
                        inputProps={{ className: cx('!py-0') }}
                    />
                </div>
            </div>
            <div className={cx('flex', 'flex-row', 'items-center', 'mobile:max-tablet:pt-4', 'mobile:max-tablet:justify-center')}>
                <Pagination
                    handleChangePage={handleChangePage}
                    page={page}
                    siblingCount={0}
                    className={cx('!p-0')}
                    totalPage={pageInfo?.total_pages}
                />
            </div>
        </div>
    );

    return (
        <Layout {...props}>
            <div className={cx('storecredit-container')}>
                <div className={cx('storecredit-balance-wrapper', 'flex', 'items-center', 'mt-[10px]')}>
                    <div>
                        <Typography variant="bd-2b">
                            {t('storecredit:balance')}
                            {' '}
                            <Show when={!loading}>
                                <b>
                                    {formatPrice(
                                        storeCredit?.current_balance?.value ?? 0,
                                        storeCredit?.current_balance?.currency ?? 'IDR',
                                        currencyCache,
                                    )}
                                </b>
                            </Show>
                        </Typography>
                    </div>
                    <Show when={loading}>
                        <Skeleton width={50} height={15} className={cx('ml-[5px]', 'mt-[2px]')} />
                    </Show>
                </div>

                <div className={cx('pt-5')}>
                    <div className={cx('relative', 'overflow-x-auto', 'rounded-lg')}>
                        <table className={cx('w-full', 'text-base', 'border-[1px]', 'border-neutral-100')}>
                            <thead>
                                <tr className={cx('text-neutral-500', 'font-semibold', 'leading-2lg', 'text-left')}>
                                    <th className={cx('px-4', 'py-3')}>
                                        {t('storecredit:transactionId')}
                                        {' '}
                                        #
                                    </th>
                                    <th className={cx('px-4', 'py-3')}>{t('storecredit:adjustment')}</th>
                                    <th className={cx('px-4', 'py-3')}>{t('storecredit:creditbalance')}</th>
                                    <th className={cx('px-4', 'py-3')}>{t('storecredit:comment')}</th>
                                    <th className={cx('px-4', 'py-3')}>{t('storecredit:transactionDate')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <Show when={loading}>
                                    <SkeletonStoreCredit />
                                </Show>
                                <Show when={!loading}>
                                    <Show when={hasTransaction}>
                                        <>
                                            {storeCredit?.transaction_history?.items.map((val, index) => (
                                                <tr className={cx('even:bg-white', 'odd:bg-neutral-50')} key={index}>
                                                    <td className={cx('p-4')}>
                                                        <Typography variant="bd-2b">{val.transaction_id}</Typography>
                                                    </td>
                                                    <td className={cx('p-4')}>
                                                        <Typography
                                                            variant="bd-2b"
                                                            className={cx(
                                                                val?.store_credit_adjustment?.value < 0 ? '!text-red-500' : '!text-green-500',
                                                            )}
                                                        >
                                                            {formatPrice(
                                                                val.store_credit_adjustment.value,
                                                                val.store_credit_adjustment.currency,
                                                                currencyCache,
                                                            )}
                                                        </Typography>
                                                    </td>
                                                    <td className={cx('p-4')}>
                                                        <Typography variant="bd-2b">
                                                            {formatPrice(
                                                                val.store_credit_balance.value,
                                                                val.store_credit_balance.currency,
                                                                currencyCache,
                                                            )}
                                                        </Typography>
                                                    </td>
                                                    <td className={cx('p-4')}>
                                                        <Typography variant="bd-2b">{val.comment}</Typography>
                                                    </td>
                                                    <td className={cx('p-4')}>
                                                        <Typography variant="bd-2b">{formatDate(val.created_at, 'DD/MM/YYYY')}</Typography>
                                                    </td>
                                                </tr>
                                            ))}
                                        </>
                                    </Show>
                                    <Show when={!hasTransaction}>
                                        <td colSpan={5}>
                                            <Alert severity="warning" withIcon>
                                                {t('storecredit:emptyMessage')}
                                            </Alert>
                                        </td>
                                    </Show>
                                </Show>
                            </tbody>
                        </table>
                    </div>
                    {/** show pagination */}
                    <Show when={hasTransaction && !loading}>
                        <PaginationComponent />
                    </Show>
                    {/** skeleton pagination */}
                    <Show when={loading}>
                        <div
                            className={cx(
                                'pt-6 flex items-center justify-between',
                            )}
                        >
                            <Skeleton width={50} height={25} />
                            <Skeleton width={150} height={50} />
                        </div>
                    </Show>
                </div>
            </div>
        </Layout>
    );
};

export default StoreCreditPage;
