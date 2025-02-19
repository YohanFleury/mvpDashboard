import { useState } from 'react'

type ApiResponse = {
    ok: boolean;
    problem: string;
    data: any;
    status: number;
    headers: Object;
    config: Object;
    duration: number;
}

const useApi = (apiFunc: any) => {
    const [data, setData] = useState<any>([])
    const [error, setError] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)
    const [status, setStatus] = useState<number>()
    const [problem, setProblem] = useState('')

    const request = async (...args: any) => {
        setError(false)
        setSuccess(false)
        setLoading(true)

        const response: ApiResponse = await apiFunc(...args)

        setLoading(false)
        //console.log(apiFunc, response.status, response.problem, response.data)

        if (!response?.ok) {
            setError(true)
            setStatus(response?.status)
            setProblem(response?.problem)
            return ;
        }

        setData(response.data)
        setSuccess(true)
    }
    return { data, error, loading, success, request, status, problem }
    
}

export default useApi