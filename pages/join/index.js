import Button from 'components/Button';
import Form from 'components/Form';
import Input from 'components/Input';
import PageWrapper from 'components/PageWrapper';

const JoinIndexPage = () => (
    <PageWrapper>
        <Form action="/api/join" method="get">
            <h1>Join</h1>
            <Input name="code" placeholder="Code" />
            <Button full color="blue">Join</Button>
        </Form>
    </PageWrapper>
);

export default JoinIndexPage;
