import type { StatCardProps } from "../types";


export function StatCard({ title, value, icon }: StatCardProps) {
    return (
        <div className="col-md-4 mb-3">
            <div className="card shadow-sm h-100">
                <div className="card-body">
                    <h5 className="card-title">
                        {icon}&nbsp;{title}
                    </h5>
                    <p className="card-text mb-1">
                        <strong>{value}</strong>
                    </p>
                </div>
            </div>
        </div>
    );
}