const getEmployee = (req, res) => {
    res.json({
        success: true,
        message: "Employee fetched successfully",
        date: []
    });
};

module.exports = { getEmployee };