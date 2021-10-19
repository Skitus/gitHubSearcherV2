import { Spin, Typography} from 'antd';
import React from 'react';

interface IUsersRepos {
    isLoading: boolean,
    usersRepo: []
}

const UsersRepos = ({isLoading, usersRepo}: IUsersRepos) => {
    return (
        <>
            {
                isLoading ?
                    <Spin size="large"/> :
                    usersRepo.map((arr: { id: number, length: number }) => (
                        <div key={arr.id} className="blockRepos">
                            <Typography.Paragraph className="repo-number">
                                Repo: {arr.length}
                            </Typography.Paragraph>
                        </div>)
                    )
            }
        </>
    );
}

export default UsersRepos;