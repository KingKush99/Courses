from qiskit import QuantumCircuit, Aer, execute

def main(shots=2000):
    qc = QuantumCircuit(2,2)
    qc.h(0); qc.cx(0,1); qc.measure([0,1],[0,1])
    result = execute(qc, Aer.get_backend('qasm_simulator'), shots=shots).result()
    print(result.get_counts())

if __name__ == '__main__':
    main()
