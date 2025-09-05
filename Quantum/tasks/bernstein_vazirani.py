from qiskit import QuantumCircuit, Aer, execute

def bv_circuit(s: str):
    n=len(s); qc=QuantumCircuit(n+1,n)
    qc.x(n); qc.h(n)
    for i in range(n): qc.h(i)
    for i,b in enumerate(s):
        if b=='1': qc.cx(i,n)
    for i in range(n):
        qc.h(i); qc.measure(i,i)
    return qc

def run(s='101101'):
    qc=bv_circuit(s)
    result=execute(qc, Aer.get_backend('qasm_simulator'), shots=1).result()
    print('Hidden s:', s); print('Measured:', list(result.get_counts().keys())[0])

if __name__ == '__main__':
    run()
