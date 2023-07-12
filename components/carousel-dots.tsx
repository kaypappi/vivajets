
type Props = {
    itemsLength: number;
    selectedIndex: number;
    className?: string;
};
const Dots = ({ itemsLength, selectedIndex, className }: Props) => {
    const arr = new Array(itemsLength).fill(0);
    return (
        <div className={`flex gap-1 my-2 justify-center -translate-y-5 ${className}`}>
            {arr.map((_, index) => {
                const selected = index === selectedIndex;
                return (
                    <div
                    style={{
                        backgroundColor: selected ? 'black' : 'transparent',
                    }}
                        className={
                            `h-3 w-3 rounded-full border border-black transition-all duration-300`
                        }
                        key={index}
                    ></div>
                );
            })}
        </div>
    );
};
export default Dots;
