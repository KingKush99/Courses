from qiskit import QuantumCircuit, Aer, execute

def main(shots=1000):
    qc = QuantumCircuit(1,1)
    qc.h(0); qc.measure(0,0)
    result = execute(qc, Aer.get_backend('qasm_simulator'), shots=shots).result()
    print(result.get_counts())

if __name__ == '__main__':
    main()
