type FactoryOptionProps = {
  factoryOptionName: string;
  value: string;
  icon?: string;
};

export default function FactoryOption({
  factoryOptionName,
  value,
  icon,
}: FactoryOptionProps) {
  return (
    <div className="bg-[#000000] rounded-2xl p-6 flex flex-col justify-center items-center gap-4">
      <div>
        <h2 className="text-[#86868B]">{factoryOptionName}</h2>
      </div>
      {icon && <i className={`${icon} text-4xl`}></i>}
      <div>
        <h3 className="text-[#D57F43] text-2xl font-bold">{value}</h3>
      </div>
    </div>
  );
}
