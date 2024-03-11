import pt from 'prop-types'

const Heading = ({ children }) => {
    return (
        <h2 className="rounded-full bg-mid text-background mx-auto py-3 px-4 text-5xl w-fit my-8">{children}</h2>
    );
};
Heading.propTypes = {
    children: pt.string,
}
export default Heading;