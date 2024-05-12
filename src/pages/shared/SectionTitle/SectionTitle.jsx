
const SectionTitle = ({heading,subHeading}) => {
    return (
        <div className="mx-auto text-center md:w-4/12 my-8">
            
            <h3 className="text-3xl uppercase border-y-4 py-4">{heading} <span className="text-xs text-warning lowercase">{subHeading}</span></h3>
        </div>
    );
};

export default SectionTitle;