import Button from 'components/Button';
import Form from 'components/Form';
import Input from 'components/Input';
import PageWrapper from 'components/PageWrapper';

const HostIndexPage = () => (
    <PageWrapper>
        <Form action="/api/host" method="post">
            <h1>Host</h1>
            <Input name="title" placeholder="Title" />
            <Button full color="blue">Host</Button>
        </Form>
    </PageWrapper>
);

export default HostIndexPage;
