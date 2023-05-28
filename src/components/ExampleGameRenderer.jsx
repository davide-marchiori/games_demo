import { useState } from 'react';
import { RadioGroup } from '@headlessui/react';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
};

export { ExampleGameRenderer };

function ExampleGameRenderer() {

    const gamePayoffs = [18, 26, 36, 40, 58, 44, 32, 50, 26, 16, 28, 26, 74, 30, 22, 56, 38, 54];
    const cellsOrder = [[11, 12, 13], [21, 22, 23], [31, 32, 33]];
    const likelihoodFields = [
        { name: 'input1', id: 1, value: '10', isError: false },
        { name: 'input2', id: 2, value: '70', isError: false },
        { name: 'input3', id: 3, value: '20', isError: false }
    ];
    const [exampleAction, setExampleAction] = useState("");

    const rowPayoffs = gamePayoffs.filter((_a, i) => i % 2 === 0);
    const colPayoffs = gamePayoffs.filter((_a, i) => i % 2 === 1);

    const cells = [
        { value: [rowPayoffs[0], colPayoffs[0]], id: 11 },
        { value: [rowPayoffs[1], colPayoffs[1]], id: 12 },
        { value: [rowPayoffs[2], colPayoffs[2]], id: 13 },
        { value: [rowPayoffs[3], colPayoffs[3]], id: 21 },
        { value: [rowPayoffs[4], colPayoffs[4]], id: 22 },
        { value: [rowPayoffs[5], colPayoffs[5]], id: 23 },
        { value: [rowPayoffs[6], colPayoffs[6]], id: 31 },
        { value: [rowPayoffs[7], colPayoffs[7]], id: 32 },
        { value: [rowPayoffs[8], colPayoffs[8]], id: 33 },
    ];

    // Could be dynamically constructed
    const colHeaders = ["C1", "C2", "C3"];
    const actions = [
        { name: 'Action 1', value: 1, id: 1 },
        { name: 'Action 2', value: 2, id: 2 },
        { name: 'Action 3', value: 3, id: 3 }
    ];

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">Example of game</h1>
                    {/*<p className="mt-2 text-sm text-gray-700">*/}
                    {/*    subtitle if needed*/}
                    {/*</p>*/}
                </div>
            </div>
            <div className="mt-4 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block py-2 align-middle md:px-6 lg:px-4">
                        <div className="overflow-hidden shadow-lg ring-1 ring-black ring-opacity-5 md:rounded-lg">
                            <RadioGroup value={exampleAction} onChange={setExampleAction} className="mt-2">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead className="bg-gray-50">
                                        <tr className="">
                                            <th rowSpan="2" className="text-center text-md font-semibold">
                                                Your Actions
                                            </th>
                                            <th colSpan="3" className="text-center text-md font-semibold">
                                                Computer's actions
                                            </th>
                                        </tr>
                                        <tr className="">
                                            {colHeaders.map(header => (
                                                <th key={header} scope="col" className="justify-center">
                                                    <div className="flex justify-center py-2">
                                                        <div className='px-6 flex justify-center text-md font-medium'>
                                                            {header}
                                                        </div>
                                                    </div>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {actions.map((action, index) => (
                                            <tr key={action.name}>
                                                <td className="whitespace-nowrap flex flex-row justify-center py-3">
                                                    <RadioGroup.Option
                                                        value={action.value}
                                                        className={({ checked }) =>
                                                            classNames(
                                                                checked
                                                                    ? 'ring-2 ring-offset-2 ring-purple-500 bg-purple-600 border-transparent text-white hover:bg-purple-700'
                                                                    : 'bg-indigo-600 border-gray-300 text-white hover:bg-indigo-700',
                                                                'border shadow-lg rounded-md py-3 px-2 flex justify-center text-md font-medium'
                                                            )}
                                                    >
                                                        <RadioGroup.Label as="span">{action.name}</RadioGroup.Label>
                                                    </RadioGroup.Option>
                                                </td>
                                                {cellsOrder[index].map(cellid => (
                                                    <td key={cellid}>
                                                        <CellRenderer values={cells.find(item => item.id === Number(cellid)).value} />
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                        <tr key="likelihood">
                                            <td className="rounded-lg text-center text-md font-medium py-2">
                                                Likelihood points:
                                            </td>
                                            {likelihoodFields.map(field => (
                                                <td key={field.id}>
                                                    <div className='flex flex-row justify-center py-2'>
                                                        <input
                                                            className='w-3/4 md:w-2/3 shadow-lg bg-gray-50 border border-gray-300 text-center text-md font-medium rounded-lg focus:ring-blue-500 focus:border-blue-500'
                                                            type="text"
                                                            name={field.name}
                                                            value={field.value}
                                                            readOnly='readonly'
                                                            maxLength="3"
                                                            placeholder="..."
                                                        />
                                                    </div>
                                                </td>
                                            ))}
                                        </tr>
                                    </tbody>
                                </table>
                            </RadioGroup>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CellRenderer({ values }) {
    return (
        <div className='flex flex-row justify-center py-2'>
            <div className="grid grid-cols-2 shadow-lg rounded-lg border border-gray-300 w-3/4">
                <div></div>
                <div className="text-gray-500 text-lg font-medium text-center rounded-lg">{values[1]}</div>
                <div className="text-green-500 text-lg font-medium text-center rounded-lg">{values[0]}</div>
                <div></div>
            </div>
        </div>
    );
}