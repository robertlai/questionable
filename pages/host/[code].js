import Button from 'components/Button';
import Form from 'components/Form';
import PageWrapper from 'components/PageWrapper';
import Table from 'components/Table';
import { TTL_MS } from 'util/constants';
import { connectToDatabase } from 'util/mongodb';

const HostPage = ({ code, title }) => (
    <PageWrapper>
        <Form>
            <h1>Hosting</h1>
            <Table data={[
                ['Title', title],
                ['Code', code],
            ]} />
            <Button full color="blue" href={'/join/' + code}>
                Join
            </Button>
        </Form>
    </PageWrapper>
);

export default HostPage;

export const getServerSideProps = async context => {
    const { db } = await connectToDatabase();

    const room = await db
        .collection('rooms')
        .findOne({
            code: context.params.code,
            createdAt: { $gt: Date.now() - TTL_MS },
        });

    return {
        props: {
            title: room.title,
            code: room.code,
        },
    };
};
